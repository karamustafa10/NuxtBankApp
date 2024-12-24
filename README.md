# NuxtBankApp

This project is a Nuxt.js application for managing banking operations. It includes various features such as user authentication, transaction management, and more.

## Table of Contents

- [Setup](#setup)
- [Development Server](#development-server)
- [Production](#production)
- [File Structure](#file-structure)
- [Plugins](#plugins)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## File Structure

- `components/`: Vue components used in the application.
- `pages/`: Application pages.
- `plugins/`: Nuxt.js plugins.
- `server/`: API endpoints and server-side logic.
- `stores/`: Pinia stores for state management.
- `prisma/`: Database schema and migrations.

## Plugins

- `toastification.js`: Plugin for toast notifications using `vue-toastification`.

## API Endpoints

- `getAllTransactions.ts`: Fetches all transactions.
- `getTransactions.ts`: Fetches transactions for a specific account.
- `getUser.ts`: Handles user authentication and session management.

## Deployment

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

