import Triangle from "./components/triangle.jsx"

/** @type {import("nextra-theme-docs").DocsThemeConfig} */
export default {
  sidebar: {
    titleComponent({ title }) {
      return title.replace("_", "/")
    },
    defaultMenuCollapseLevel: 1,
  },
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
          className="nx-text-primary-600"
          target="_blank"
          style={{
            color: "hsl(20deg 100% 45%/var(--tw-text-opacity))",
          }}
          rel="noopener noreferrer"
          href="https://next-auth.js.org"
        >
          NextAuth.js
        </a>{" "}
        is now Auth.js! 🎉 Authentication for the Web. Everyone included.
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
