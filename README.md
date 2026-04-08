# Loader of TypeScript for Node.js

Load `.ts`, `.mts`, and `.cts` files in Node.js by registering a custom `load` hook.

This package wires into Node's module loader (`node:module`) and strips TypeScript
types at load time, so files can run directly without a build step.

## What this project does

- Registers a Node.js module hook via `registerHooks(...)`.
- Intercepts TypeScript files based on extension:
  - `.cts` → loads as CommonJS
  - `.mts` → loads as ESM
  - `.ts` → auto-detects module type from nearest `package.json`
- Uses `stripTypeScriptTypes(...)` from `node:module` to remove TypeScript-only syntax.
- Passes non-TypeScript files through untouched.

## How module type is chosen for `.ts`

For plain `.ts` files, the loader walks up directories from the file location:

- If it finds a `package.json` with `"type": "module"`, the file is treated as ESM.
- Otherwise, it is treated as CommonJS.
- If no `package.json` is found, CommonJS is used.

## Requirements

- Node.js `>=24.14.0`
- npm `>=11.9.0`

## Installation

```bash
npm install loader-of-typescript-for-node-js
```

## Usage

### 1. Register through Node's import flag (recommended)

```bash
node --import loader-of-typescript-for-node-js ./path/to/file.ts
```

You can also keep it enabled globally for a session:

```bash
export NODE_OPTIONS="--import=loader-of-typescript-for-node-js"
node ./path/to/file.ts
```

### 2. Register programmatically

Importing the package runs its side-effect entrypoint and registers the hook:

```ts
import "loader-of-typescript-for-node-js";
```

## Notes and limitations

- This loader strips types; it does not perform full TypeScript transpilation.
- Prefer erasable TypeScript syntax compatible with `stripTypeScriptTypes(...)`.
- Keep using `tsc --noEmit` (or equivalent) for type checking in CI.
