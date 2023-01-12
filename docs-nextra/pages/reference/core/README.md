# @auth/core

## Table of contents

### Modules

- [adapters](undefined)
- [errors](undefined)
- [jwt](undefined)
- [main](undefined)
- [providers](undefined)
- [providers/apple](undefined)
- [providers/auth0](undefined)
- [providers/battlenet](undefined)
- [providers/credentials](undefined)
- [providers/email](undefined)
- [providers/fusionauth](undefined)
- [providers/github](undefined)
- [providers/gitlab](undefined)
- [providers/kakao](undefined)
- [providers/mattermost](undefined)
- [providers/naver](undefined)
- [providers/spotify](undefined)
- [providers/twitter](undefined)
- [providers/wikimedia](undefined)
- [types](undefined)

## Modules

### adapters

• **adapters**: Module adapters

This module contains functions and types that a database adapter
can use to be compatible with Auth.js.

A database adapter provides a common interface for Auth.js so that it can work with
_any_ database/ORM adapter without concerning itself with the implementation details of the database/ORM.

Auth.js supports 2 session strtategies to persist the login state of a user.
The default is to use a cookie + [JWT](https://authjs.dev/concepts/session-strategies#jwt)
based session store (`strategy: "jwt"`),
but you can also use a database adapter to store the session in a database.

:::info Note
Auth.js _currently_ does **not** implement [federated logout](https://authjs.dev/concepts/session-strategies#federated-logout).
So even if the session is deleted from the database, the user will still be logged in to the provider (but will be logged out of the app).
See [this discussion](https://github.com/nextauthjs/next-auth/discussions/3938) for more information.
:::

## Installation

```bash npm2yarn2pnpm
npm install @auth/core
```

You can then import this submodule from `@auth/core/adapters`.

## Usage

[Built-in adapters](https://authjs.dev/reference/adapters/overview) already implement this interfac, so you likely won't need to
implement it yourself. If you do, you can use the following example as a
starting point.

```ts title=your-adapter.ts
import { type Adapter } from "@auth/core/adapters"

export function MyAdapter(config: {}): Adapter {
 // implement the adapter methods
}
```

```ts title=index.ts
import { MyAdapter } from "./your-adapter"

const response = Auth({
  adapter: MyAdapter({ /* ...adapter config */ }),
  // ... auth config
})
```

:::caution Note
Although `@auth/core` is framework/runtime agnostic, an adapter might rely on a client/ORM package,
that is not yet compatible with your runtime
(E.g. it might rely on [Node.js-specific APIs](https://nodejs.org/docs/latest/api)) when you are trying to use it elsewhere.
Related issues should be reported to the corresponding package maintainers.
:::

### Testing
:::tip
If you are writing your own adapter, there is a test suite [available](https://github.com/nextauthjs/next-auth/tree/main/packages/adapter-test)
to ensure that your adapter is compatible with Auth.js.
:::

## Resources

- [What is a database session strategy?](https://authjs.dev/concepts/session-strategies#database)

___

### errors

• **errors**: Module errors

___

### jwt

• **jwt**: Module jwt

This module contains functions and types
to encode and decode [JWT](https://authjs.dev/concepts/session-strategies#jwt)s
issued and used by Auth.js.

The JWT issued by Auth.js is _encrypted by default_, using the _A256GCM_ algorithm ([JWE](https://www.rfc-editor.org/rfc/rfc7516)).
It uses the `AUTH_SECRET` environment variable to dervice a sufficient encryption key.

:::info Note
Auth.js JWTs are meant to be used by the same app that issued them.
If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
:::

## Installation

```bash npm2yarn2pnpm
npm install @auth/core
```

You can then import this submodule from `@auth/core/jwt`.

## Usage

:::warning Warning
This module *will* be refactored/changed. We do not recommend relying on it right now.
:::

## Resources

- [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt)
- [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)

___

### main

• **main**: Module main

This is the main entry point to the Auth.js library.

Based on the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) Web standard APIs.
Primarily used to implement [framework](https://authjs.dev/concepts/frameworks)-specific packages,
but it can also be used directly.

## Installation

```bash npm2yarn2pnpm
npm install @auth/core
```

## Usage

```ts
import { Auth } from "@auth/core"

const request = new Request("https://example.com"
const response = await Auth(request, {...})

console.log(response instanceof Response) // true
```

## Resources

- [Getting started](https://authjs.dev/getting-started/introduction)
- [Most common use case guides](https://authjs.dev/guides/overview)

___

### providers

• **providers**: Module providers

___

### providers/apple

• **providers/apple**: Module providers/apple

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Apple</b> integration.</span>
<a href="https://apple.com">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/apple-dark.svg" height="48" width="48"/>
</a>
</div>

---

___

### providers/auth0

• **providers/auth0**: Module providers/auth0

<div style={{backgroundColor: "#EB5424", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Auth0</b> integration.</span>
<a href="https://auth0.com">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/auth0-dark.svg" height="48" width="48"/>
</a>
</div>

---

___

### providers/battlenet

• **providers/battlenet**: Module providers/battlenet

___

### providers/credentials

• **providers/credentials**: Module providers/credentials

___

### providers/email

• **providers/email**: Module providers/email

___

### providers/fusionauth

• **providers/fusionauth**: Module providers/fusionauth

___

### providers/github

• **providers/github**: Module providers/github

<div style={{backgroundColor: "#24292f", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>GitHub</b> integration.</span>
<a href="https://github.com">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/github-dark.svg" height="48" width="48"/>
</a>
</div>

---

___

### providers/gitlab

• **providers/gitlab**: Module providers/gitlab

___

### providers/kakao

• **providers/kakao**: Module providers/kakao

___

### providers/mattermost

• **providers/mattermost**: Module providers/mattermost

___

### providers/naver

• **providers/naver**: Module providers/naver

___

### providers/spotify

• **providers/spotify**: Module providers/spotify

___

### providers/twitter

• **providers/twitter**: Module providers/twitter

___

### providers/wikimedia

• **providers/wikimedia**: Module providers/wikimedia

___

### types

• **types**: Module types

This module contains public types and interfaces of the core package.

## Installation

```bash npm2yarn2pnpm
npm install @auth/core
```

You can then import this submodule from `@auth/core/type`.

## Usage

Even if you don't use TypeScript, IDEs like VSCode will pick up types to provide you with a better developer experience.
While you are typing, you will get suggestions about what certain objects/functions look like,
and sometimes links to documentation, examples, and other valuable resources.

Generally, you will not need to import types from this module.
Mostly when using the `Auth` function and optionally the `AuthConfig` interface,
everything inside there will already be typed.

:::tip
Inside the `Auth` function, you won't need to use a single type from this module.

**`Example`**

```ts title=index.ts
import { Auth } from "@auth/core"

const request = new Request("https://example.com")
const response = await Auth(request, {
  callbacks: {
    jwt(): JWT { // <-- This is unnecessary!
      return { foo: "bar" }
    },
    session(
       { session, token }: { session: Session; token: JWT } // <-- This is unnecessary!
    ) {
      return session
    },
  }
})
```
:::

:::info
We are advocates of TypeScript, as it will help you catch errors at build-time, before your users do. 😉
:::

## Resources

- [TypeScript - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [Extending built-in types](https://authjs.dev/getting-started/typescript#module-augmentation)
