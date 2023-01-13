import withNextra from "nextra"
import RemarkLinkRewrite from "remark-link-rewrite"

export default withNextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  mdxOptions: {
    remarkPlugins: [
      [
        RemarkLinkRewrite,
        {
          replacer(url) {
            if (url.endsWith(".md")) {
              url = url.replace(".md", "")
            }
            if (url.startsWith("https://authjs.dev")) {
              url = url.replace("https://authjs.dev", "")
            }
            return url
          },
        },
      ],
    ],
  },
})()
