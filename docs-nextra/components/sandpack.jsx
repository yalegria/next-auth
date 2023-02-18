import { Sandpack } from "@codesandbox/sandpack-react"
import { freeCodeCampDark } from "@codesandbox/sandpack-themes"

export default function AuthSandbox() {
  return (
    <div style={{ width: "100%" }}>
      <Sandpack
        template="nextjs"
        files={{
          "/pages/api/auth/[...nextauth].js": `import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}
export default NextAuth(authOptions)
`,
          "pages/_app.js": `import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}`,
          ".env": `GITHUB_ID=123abc
GITHUB_SECRET=abc123
NEXTAUTH_SECRET=abcbaerjwiofjlakshfu9fnajs
`,
          "/pages/index.js": `export default function App() {
  return <div><h1>Hello NextAuth User</h1><a href="/api/auth/signin">Signin</a></div>
}`,
        }}
        theme={freeCodeCampDark}
        customSetup={{
          dependencies: {
            "next-auth": "latest",
          },
        }}
        options={{
          showInlineErrors: true,
          showLineNumbers: true,
          showTabs: true,
          closableTabs: true,
          showNavigator: true,
          showConsole: true,
          showConsoleButton: true,
          editorHeight: "70vh",
        }}
      />
    </div>
  )
}
