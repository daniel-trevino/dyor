# 👀 DYOR 👀

Do Your Own Research boilerplate.
Fullstack Web3 Boilerplate using the latest stack.

Simple, easy, modern, fast 🚀

## What's inside?

This boilerplate is based on [Turborepo](https://github.com/vercel/turborepo).
It uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `frontend`: A [Next.js](https://nextjs.org) based app
- `ui`: a Reac component library using [Tailwind](https://tailwindui.com/) that can be shared with any new `app/` in this repository
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-server`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/). 🙈

### Stack 🦾

This boilerplate contains a modern stack for building Web3 apps:

- [Next.js](https://nextjs.org) framework
- [WAGMI Hooks](https://github.com/tmm/wagmi) to take advantage of the latest Web3 hooks
- [ethers.js](https://github.com/ethers-io/ethers.js) to handle the Web3 interactions
- [Tailwind](https://tailwindui.com/) to make it look sexy
- [Typechain](https://github.com/dethcrypto/TypeChain) to keep those end-to-end types generated from ABIs
- [Hardhat](https://hardhat.org/) to deploy some nice Smart Contracts

### Utility Stack 🔍

This boilerplate contains a modern stack for building Web3 apps:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Get started

> Clone/Fork this bad boy 🧙‍♀️:

```
git clone https://github.com/danielivert/dyor.git
```

> ⛑ Install:

```
cd dyor
yarn install
```

> Run both the hardhat node and the frontend

```
yarn dev
```

🔏 Edit your smart contract TestContract.sol in apps/hardhat-core/contracts

📝 Edit your frontend in apps/frontend/src

🧱 Edit your components in packages/ui

💻 Open http://localhost:3000 to see the app
