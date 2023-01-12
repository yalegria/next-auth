// @ts-check
const fs = require("node:fs")
const path = require("node:path")

// list providers entries from @auth/core/providers/*.ts
const coreSrc = "../packages/core/src"
const providers = fs
  .readdirSync(path.join(__dirname, coreSrc, "/providers"))
  .filter((file) => file.endsWith(".ts") && !file.startsWith("oauth"))
  .map((p) => `${coreSrc}/providers/${p}`)

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  entryPoints: ["index.ts", "adapters.ts", "errors.ts", "jwt.ts", "types.ts"]
    .map((e) => `${coreSrc}/${e}`)
    .concat(providers),
  watch: process.env.TYPEDOC_WATCH,
  out: "pages/reference/core",
  tsconfig: "../packages/core/tsconfig.json",
  excludeNotDocumented: true,
  allReflectionsHaveOwnDocument: true,
  disableSources: true,
  hideBreadcrumbs: true,
  excludeExternals: true,
  excludeInternal: true,
  excludePrivate: true,
  cleanOutputDir: true,
  excludeProtected: true,
  gitRevision: "main",
  githubPages: false,
  hideGenerator: true,
  intentionallyNotExported: ["ReturnTypes", "CallbackParameters", "JsonValue"],
  readme: "none",
  sort: ["kind", "static-first", "required-first", "alphabetical"],
  kindSortOrder: [
    "Function",
    "TypeAlias",
    "Interface",
    "Reference",
    "Project",
    "Module",
    "Namespace",
    "Class",
    "Constructor",
    "Property",
    "Variable",
    "Accessor",
    "Method",
    "ObjectLiteral",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature",
  ],
}
