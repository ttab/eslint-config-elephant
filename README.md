# @ttab/eslint-config-elephant

> [!WARNING]
> **This repository is archived and no longer maintained.**
> It is read-only: no further releases, bug fixes, or dependency updates will be
> published here. Existing installs of `@ttab/eslint-config-elephant` keep
> working, but you should not rely on this package for new projects.

Do you even lint bro? This will help you lint your code. 

One config to rule them all. Especially for everything elephant related.
New fresh [eslint](https://eslint.org) 9 flat config for static code analysis and enforcement of code conventions and best practices.

Style and formatting is provided by [@stylistic](https://eslint.style/) 

Consists of:
* eslint-config-react
* eslint-config-react-hooks
* eslint-config-jest
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
    ...elephant,
  {
    rules: {
      // Add or change rules here
    }
  }
]
```
