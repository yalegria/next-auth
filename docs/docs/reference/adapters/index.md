---
title: Overview
---

Using an Auth.js / NextAuth.js adapter you can connect to any database service or even several different services at the same time. The following listed official adapters are created and maintained by the community:

<div class="adapter-card-list">
  <a href="/reference/adapter/azure-tables" class="adapter-card">
    <img src="/img/adapters/azure-tables.svg" width="40" />
    <h4 class="adapter-card__title">Azure Table Storage Adapter</h4>
  </a>
  <a href="/reference/adapter/d1" class="adapter-card">
    <img src="/img/adapters/d1.svg" width="40" />
    <h4 class="adapter-card__title">D1 Adapter</h4>
  </a>
  <a href="/reference/adapter/edgedb" class="adapter-card">
    <img src="/img/adapters/edgedb.svg" width="30" />
    <h4 class="adapter-card__title">EdgeDB Adapter</h4>
  </a>
  <a href="/reference/adapter/dgraph" class="adapter-card">
    <img src="/img/adapters/dgraph.png" width="30" />
    <h4 class="adapter-card__title">Dgraph Adapter</h4>
  </a>
   <a href="/reference/adapter/drizzle" class="adapter-card">
    <img src="/img/adapters/drizzle-orm.png" width="30" />
    <h4 class="adapter-card__title">Drizzle Adapter</h4>
  </a>
  <a href="/reference/adapter/dynamodb" class="adapter-card">
    <img src="/img/adapters/dynamodb.png" width="30" />
    <h4 class="adapter-card__title">DynamoDB Adapter</h4>
  </a>
  <a href="/reference/adapter/fauna" class="adapter-card">
    <img src="/img/adapters/fauna.png" width="30" />
    <h4 class="adapter-card__title">Fauna Adapter</h4>
  </a>
  <a href="/reference/adapter/firebase" class="adapter-card">
    <img src="/img/adapters/firebase.svg" width="40" />
    <h4 class="adapter-card__title">Firebase Adapter</h4>
  </a>
  <a href="/reference/adapter/hasura" class="adapter-card">
    <img src="/img/adapters/hasura.svg" width="40" />
    <h4 class="adapter-card__title">Hasura Adapter</h4>
  </a>
  <a href="/reference/adapter/kysely" class="adapter-card">
    <img src="/img/adapters/kysely.svg" width="40" />
    <h4 class="adapter-card__title">Kysely Adapter</h4>
  </a>
  <a href="/reference/adapter/mikro-orm" class="adapter-card">
    <img src="/img/adapters/mikro-orm.png" width="30" />
    <h4 class="adapter-card__title">Mikro ORM Adapter</h4>
  </a>
  <a href="/reference/adapter/mongodb" class="adapter-card">
    <img src="/img/adapters/mongodb.svg" width="15" />
    <h4 class="adapter-card__title">MongoDB Adapter</h4>
  </a>
  <a href="/reference/adapter/neo4j" class="adapter-card">
    <img src="/img/adapters/neo4j.svg" width="50" />
    <h4 class="adapter-card__title">Neo4j Adapter</h4>
  </a>
  <a href="/reference/adapter/pg" class="adapter-card">
    <img src="/img/adapters/pg.png" width="20" />
    <h4 class="adapter-card__title">Postgres Adapter</h4>
  </a>
  <a href="/reference/adapter/pouchdb" class="adapter-card">
    <img src="/img/adapters/pouchdb.svg" width="20" />
    <h4 class="adapter-card__title">PouchDB Adapter</h4>
  </a>
  <a href="/reference/adapter/prisma" class="adapter-card">
    <img src="/img/adapters/prisma.svg" width="30" />
    <h4 class="adapter-card__title">Prisma Adapter</h4>
  </a>
  <a href="/reference/adapter/sequelize" class="adapter-card">
    <img src="/img/adapters/sequelize.svg" width="30" />
    <h4 class="adapter-card__title">Sequelize Adapter</h4>
  </a>
  <a href="/reference/adapter/supabase" class="adapter-card">
    <img src="/img/adapters/supabase.svg" width="25" />
    <h4 class="adapter-card__title">Supabase Adapter</h4>
  </a>
  <a href="/reference/adapter/surrealdb" class="adapter-card">
    <img src="/img/adapters/surreal.png" width="25" />
    <h4 class="adapter-card__title">SurrealDB Adapter</h4>
  </a>
  <a href="/reference/adapter/typeorm" class="adapter-card">
    <img src="/img/adapters/typeorm.png" width="30" />
    <h4 class="adapter-card__title">TypeORM Adapter</h4>
  </a>
  <a href="/reference/adapter/upstash-redis" class="adapter-card">
    <img src="/img/adapters/upstash-redis.svg" width="30" />
    <h4 class="adapter-card__title">Upstash Adapter</h4>
  </a>
  <a href="/reference/adapter/xata" class="adapter-card">
    <img src="/img/adapters/xata.svg" width="20" />
    <h4 class="adapter-card__title">Xata Adapter</h4>
  </a>
</div>

:::info
If you don't find an adapter for the database or service you use, you can always create one yourself. Have a look at our guide on [how to create a database adapter](/guides/adapters/creating-a-database-adapter).
:::

## Models

Auth.js can be used with any database. Models tell you what structures Auth.js expects from your database. Models will vary slightly depending on which adapter you use, but in general, will look something like this:

```mermaid
erDiagram
    User ||--|{ Account : ""
    User {
      string id
      string name
      string email
      timestamp emailVerified
      string image
    }
    User ||--|{ Session : ""
    Session {
      string id
      timestamp expires
      string sessionToken
      string userId
    }
    Account {
      string id
      string userId
      string type
      string provider
      string providerAccountId
      string refresh_token
      string access_token
      int expires_at
      string token_type
      string scope
      string id_token
      string session_state
    }
    VerificationToken {
      string identifier
      string token
      timestamp expires
    }
```

More information about each Model/Table can be found below.

:::note
You can [create your adapter](/guides/adapters/creating-a-database-adapter) if you want to use Auth.js with a database that is not supported out of the box, or you have to change fields on any of the models.
:::

---

### User

The User model is for information such as the user's name and email address.

Email address is optional, but if one is specified for a User, then it must be unique.

:::note
If a user first signs in with an OAuth provider, then their email address is automatically populated using the one from their OAuth profile if the OAuth provider returns one.

This provides a way to contact users and for users to maintain access to their account and sign in using email in the event they are unable to sign in with the OAuth provider in the future (if the [Email Provider](/reference/core/providers_email) is configured).
:::

User creation in the database is automatic and happens when the user is logging in for the first time with a provider.
If the first sign-in is via the [OAuth Provider](/reference/core/providers_oauth), the default data saved is `id`, `name`, `email` and `image`. You can add more profile data by returning extra fields in your [OAuth provider](/guides/providers/custom-provider)'s [`profile()`](/reference/core/providers#profile) callback.

If the first sign-in is via the [Email Provider](/reference/core/providers_email), then the saved user will have `id`, `email`, `emailVerified`, where `emailVerified` is the timestamp of when the user was created.

### Account

The Account model is for information about OAuth accounts associated with a User

A single User can have multiple Accounts, but each Account can only have one User.

Account creation in the database is automatic and happens when the user is logging in for the first time with a provider, or the [`Adapter.linkAccount`](/reference/core/adapters#linkaccount) method is invoked. The default data saved is `access_token`, `expires_at`, `refresh_token`, `id_token`, `token_type`, `scope` and `session_state`. You can save other fields or remove the ones you don't need by returning them in the [OAuth provider](/guides/providers/custom-provider)'s [`account()`](/reference/core/providers#account) callback.

Linking Accounts to Users happen automatically, only when they have the same e-mail address, and the user is currently signed in. Check the [FAQ](/concepts/faq#security) for more information on why this is a requirement.

:::tip
You can manually unlink accounts if your adapter implements the `unlinkAccount` method. Make sure to take all the necessary security steps to avoid data loss.
:::

:::note
Linking and unlinking accounts through an API is a planned feature: https://github.com/nextauthjs/next-auth/issues/230
:::

### Session

The Session model is used for database sessions. It is not used if JSON Web Tokens are enabled. Keep in mind, that you can use a database to persist Users and Accounts, and still use JWT for sessions. See the [`session.strategy`](/getting-started/upgrade-to-v4#session-strategy) option.

A single User can have multiple Sessions, each Session can only have one User.

:::tip
When a Session is read, we check if its `expires` field indicates an invalid session, and delete it from the database. You can also do this clean-up periodically in the background to avoid our extra delete call to the database during an active session retrieval. This might result in a slight performance increase in a few cases.
:::

### Verification Token

The Verification Token model is used to store tokens for passwordless sign in.

A single User can have multiple open Verification Tokens (e.g. to sign in to different devices).

It has been designed to be extendable for other verification purposes in the future (e.g. 2FA / magic codes, etc.).

:::note
Auth.js makes sure that every token is usable only once, and by default has a short (1 day, can be configured by [`maxAge`](/guides/providers/email)) lifetime. If your user did not manage to finish the sign-in flow in time, they will have to start the sign-in process again.
:::

:::tip
Due to users forgetting or failing at the sign-in flow, you might end up with unwanted rows in your database, that you might have to periodically clean up to avoid filling the database up with unnecessary data.
:::

## RDBMS Naming Convention

Auth.js / NextAuth.js uses `camelCase` for its database rows while respecting the conventional `snake_case` formatting for OAuth-related values. If the mixed casing is an issue for you, most adapters have a dedicated documentation section on how to force a casing convention.

## TypeScript

Check out the [`@auth/core/adapters` API Reference](/reference/core/adapters) documentation.

## Create a custom adapter

If you are using a database that we don't have an official adapter for, you can check out the [Creating a database adapter](/guides/adapters/creating-a-database-adapter) guide.
