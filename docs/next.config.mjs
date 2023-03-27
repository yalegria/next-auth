import withNextra from "nextra"
import RemarkLinkRewrite from "remark-link-rewrite"

export default withNextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  mdxOptions: {
    format: "detect",
    remarkPlugins: [
      [
        RemarkLinkRewrite,
        {
          replacer(url) {
            if (url.includes(".md")) {
              url = url.replace(/\.md$/, "").replace(".md#", "#")
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
