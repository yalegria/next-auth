import Triangle from "./components/triangle.jsx"

/** @type {import("nextra-theme-docs").DocsThemeConfig} */
export default {
  logo: (
    <>
      <Triangle className="h-8" />
      <span style={{ marginLeft: 8 }}>Auth.js</span>
    </>
  ),
  toc: { extraContent: <></> },
  darkMode: true,
  primaryHue: {
    light: 260,
    dark: 20,
  },
  banner: {
    text: (
      <>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://next-auth.js.org"
        >
          NextAuth.js
        </a>{" "}
        is becoming Auth.js! 🎉 We're creating Authentication for the Web.
        Everyone included. Starting with SvelteKit, check out{" "}
        <a href="/reference/sveltekit">the docs</a>
      </>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Auth.js",
      description: "Authentication for the Web.",
    }
  },
  docsRepositoryBase: "https://github.com/nextauthjs/next-auth/docs",
  project: { link: "https://github.com/nextauthjs/next-auth" },
}
