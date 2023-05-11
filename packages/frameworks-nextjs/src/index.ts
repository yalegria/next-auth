/**
 *
 * :::warning Note
 * This is the documentation for `next-auth@5`, which is currently **experimental**. For the documentation of the latest stable version, see [next-auth@4](https://next-auth.js.org).
 * :::
 *
 * If you are looking for the migration guide, visit the [`next-auth@5` Migration Guide](https://nextjs.authjs.dev/v5).
 *
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install next-auth@5 @auth/core
 * ```
 *
 * ## Signing in and signing out
 *
 * The App Router embraces Server Actions that can be leveraged to decrease the amount of JavaScript sent to the browser.
 *
 * :::info
 * [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) is **in alpha stage**. In the future, NextAuth.js will integrate with Server Actions and provide first-party APIs.
 * Until then, here is how you can use NextAuth.js to log in and log out without JavaScript.
 * :::
 *
 * ```ts title="app/auth-components.tsx"
 * import { auth } from "../auth"
 * import { cookies } from "next/headers"
 *
 * function CSRF() {
 *   const value = cookies().get("next-auth.csrf-token")?.value.split("|")[0]
 *   return <input type="hidden" name="csrfToken" value={value} />
 * }
 *
 * export function SignIn({ provider, ...props }: any) {
 *   return (
 *     <form action={`/api/auth/signin/${provider}`} method="post">
 *       <button {{...props}}/>
 *       <CSRF/>
 *     </form>
 *   )
 * }
 *
 * export function SignOut(props: any) {
 *   return (
 *     <form action="/api/auth/signout" method="post">
 *       <button {...props}/>
 *       <CSRF/>
 *     </form>
 *   )
 * }
 * ```
 *
 * Alternatively, you can create client components, using the `signIn()` and `signOut` methods:
 *
 * ```ts title="app/auth-components.tsx"
 * "use client"
 * import { signIn, signOut } from "next-auth/react"
 *
 * export function SignIn({provider, ...props}: any) {
 *   return <button {...props} onClick={() => signIn(provider)}/>
 * }
 *
 * export function SignOut(props: any) {
 *   return <button {...props} onClick={() => signOut()}/>
 * }
 * ```
 *
 * Then, you could for example use it like this:
 *
 * ```ts title=app/page.tsx
 * import { SignIn, SignOut } from "./auth-components"
 *
 * export default async function Page() {
 *   const session = await auth()
 *   if (session) {
 *     return (
 *       <>
 *         <pre>{JSON.stringify(session, null, 2)}</pre>
 *         <SignOut>Sign out</SignOut>
 *       </>
 *     )
 *   }
 *   return <SignIn id="github">Sign in with github</SignIn>
 * }
 * ```
 *
 * @module index
 */

import { Auth } from "@auth/core"
import { setEnvDefaults } from "./lib/env.js"
import { initAuth, initGetServerSession } from "./lib/index.js"

import type { NextRequest } from "next/server"
import type { NextAuthConfig } from "./lib/index.js"

type AppRouteHandlers = Record<
  "GET" | "POST",
  (req: NextRequest) => Promise<Response>
>

export type { NextAuthConfig }

/**
 * The result of invoking {@link NextAuth|NextAuth}, initialized with the {@link NextAuthConfig}.
 * It contains methods to set up and interact with NextAuth.js in your Next.js app.
 */
export interface NextAuthResult {
  /**
   * The NextAuth.js [Route Handler](https://beta.nextjs.org/docs/routing/route-handlers) methods. After initializing NextAuth.js in `auth.ts`,
   * export these methods from `app/api/auth/[...nextauth]/route.ts`.
   *
   * :::note
   * This is a workaround until we have integrated with [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions).
   * :::
   *
   * @example
   * ```ts title="app/api/auth/[...nextauth]/route.ts"
   * import { handlers } from "../../../../auth"
   * export const { GET, POST } = handlers
   * export const runtime = "edge"
   * ```
   */
  handlers: AppRouteHandlers
  /**
   * A universal method to interact with NextAuth.js in your Next.js app.
   * After initializing NextAuth.js in `auth.ts`, use this method in Middleware, Route Handlers, Edge API Routes or React Server Components.
   *
   * #### In Middleware
   *
   * @example
   * ```ts title="middleware.ts"
   * export { auth as middleware } from "./auth"
   * // or
   * import { auth } from "./auth"
   * export default auth((req) => {
   *   // req.auth
   * })
   *
   * // Optionally, don't invoke Middleware on some paths
   * // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   * export const config = {
   *   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
   * }
   * ```
   *
   * #### In Server Components
   *
   * @example
   * ```ts title="app/page.ts"
   * import { auth } from "../auth"
   *
   * export default async function Page() {
   *   const { user } = await auth()
   *   return <p>Hello {user?.name}</p>
   * }
   * ```
   *
   * #### In Route Handlers
   * @example
   * ```ts title="app/api/route.ts"
   * import { auth } from "../../auth"
   *
   * export const POST = auth((req) => {
   *   // req.auth
   * })
   * ```
   *
   * #### In Edge API Routes
   *
   * @example
   * ```ts title="pages/api/protected.ts"
   * import { auth } from "../../auth"
   *
   * export default auth((req) => {
   *   // req.auth
   * })
   *
   * export const config = { runtime: "edge" }
   * ```
   */
  auth: ReturnType<typeof initAuth>
  /**
   * Similar to {@link auth}, but for use in [`getServerSideProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props) and [API Routes in `pages/`](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
   * that do not set [`runtime: "edge"`](https://nextjs.org/docs/pages/building-your-application/routing/api-routes#edge-api-routes).
   * For all other usecases, use {@link auth} instead.
   *
   * #### In `getServerSideProps`
   * @example
   * ```ts title="pages/api/protected-ssr.ts"
   * //...
   * export const getServerSideProps: GetServerSideProps = async (context) => {
   *   const session = await getServerSession(context)
   *
   *   if (session) {
   *     // Do something with the session
   *     return { props: { session, content: (await res.json()).content } }
   *   }
   *
   *   return { props: {} }
   * }
   * ```
   *
   * #### In API Routes
   *
   * :::info
   * If you set `export const config = {runtime: "edge"}` in your API Route, use {@link auth} instead.
   * :::
   *
   * @example
   * ```ts title="pages/api/protected.ts"
   * import { getServerSession } from "../auth"
   * import type { NextApiRequest, NextApiResponse } from "next"
   *
   * export default async (req: NextApiRequest, res: NextApiResponse) => {
   *   const session = await getServerSession(req, res)
   *   if (session) {
   *     // Do something with the session
   *     return res.send("This is protected content.")
   *   }
   *   res.status(401).send("You must be signed in.")
   * }
   * ```
   */
  getServerSession: ReturnType<typeof initGetServerSession>
}

/**
 *  Initialize NextAuth.js.
 *
 *  @example
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "@auth/core/providers/github"
 *
 * export const { handlers, auth } = NextAuth({ providers: [GitHub] })
 * ```
 */
export default function NextAuth(config: NextAuthConfig): NextAuthResult {
  setEnvDefaults(config)
  const httpHandler = (req: NextRequest) => Auth(req, config)
  return {
    handlers: { GET: httpHandler, POST: httpHandler } as const,
    auth: initAuth(config),
    getServerSession: initGetServerSession(config),
  }
}
