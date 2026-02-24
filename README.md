# @ttab/eslint-config-elephant

Do you even lint bro? This will help you lint your code.

One config to rule them all. Especially for everything elephant related.
New fresh [eslint](https://eslint.org) 10 flat config for static code analysis and enforcement of code conventions and best practices.

Style and formatting is provided by [@stylistic](https://eslint.style/)

Consists of:
* eslint-plugin-react
* eslint-plugin-react-hooks
* @vitest/eslint-plugin
* @stylistic/eslint-plugin
* typescript-eslint with TypeChecked

## Installation
```bash
npm install @ttab/eslint-config-elephant --save-dev
npm install eslint --save-dev
```

`package.json`
```json
  "scripts": {
    "lint": "eslint . --cache"
  },
```

`tsconfig.json`
```json
  "include": ["eslint.config.js"]
```
`.gitignore`
```
.eslintcache
```
## Configuration
```js
// eslint.config.js
import elephant from '@ttab/eslint-config-elephant'

export default [
  ...elephant({ reactVersion: '19' }),
  {
    rules: {
      // Add or change rules here
    }
  }
]
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reactVersion` | `string` | **required** | React version for eslint-plugin-react |
| `tsconfigRootDir` | `string` | `import.meta.dirname` | Root directory for TypeScript project service |
| `testFiles` | `string[]` | `['__tests__/**']` | Glob patterns for test files (vitest rules apply here) |
| `ignores` | `string[]` | `[]` | Additional ignore patterns (merged with built-in `dist/` and `coverage/`) |

### Example with all options
```js
import elephant from '@ttab/eslint-config-elephant'

export default [
  ...elephant({
    reactVersion: '19',
    tsconfigRootDir: import.meta.dirname,
    testFiles: ['src/**/*.test.ts', '__tests__/**'],
    ignores: ['**/build/**']
  }),
  {
    rules: {
      // Add or change rules here
    }
  }
]
```

## Known workarounds

This release includes workarounds for plugins that have not yet published ESLint 10-compatible versions:

- **eslint-plugin-react** does not support ESLint 10. The `version: 'detect'` setting triggers a call to the removed `context.getFilename()` API. Workaround: `reactVersion` is a required option instead of auto-detected. Track [jsx-eslint/eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977).
- **eslint-plugin-react-hooks** does not declare `eslint ^10` in its peer dependencies. Workaround: pinned to a canary release. Track [facebook/react#35758](https://github.com/facebook/react/issues/35758).
- Both plugins require `--legacy-peer-deps` when installing.

### Once plugins are updated

When `eslint-plugin-react` publishes a version that supports ESLint 10:
- `reactVersion` can be made optional again with `'detect'` as the default
- The `--legacy-peer-deps` workaround can be dropped
- Remove `--legacy-peer-deps` from the CI workflow (`.github/workflows/ci.yml`)

When `eslint-plugin-react-hooks` publishes a stable ESLint 10-compatible release:
- Replace the canary pin with a stable version range
