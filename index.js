import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import vitestPlugin from '@vitest/eslint-plugin'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default function elephant(options = {}) {
  const {
    reactVersion,
    tsconfigRootDir = import.meta.dirname,
    testFiles = ['__tests__/**'],
    ignores = []
  } = options

  if (!reactVersion) {
    throw new Error('@ttab/eslint-config-elephant: options.reactVersion is required')
  }

  return defineConfig(
    {
      settings: {
        react: {
          version: reactVersion
        }
      }
    },
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
    },
    {
      ignores: ['**/dist/**', '**/coverage/**', '**/*.d.ts', ...ignores]
    },
    eslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    stylistic.configs.customize({
      indent: 2,
      quote: 'single',
      braceStyle: '1tbs',
      arrowParens: true,
      semi: false,
      jsx: true
    }),

    {
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        '@stylistic': stylistic,
        'react-hooks': reactHooksPlugin,
        vitest: vitestPlugin
      },
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir
        }
      },
      rules: {
        ...reactHooksPlugin.configs.recommended.rules,
        '@stylistic/indent': ['error', 2, {
          ArrayExpression: 1,
          CallExpression: { arguments: 1 },
          flatTernaryExpressions: false,
          FunctionDeclaration: { body: 1, parameters: 1, returnType: 1 },
          FunctionExpression: { body: 1, parameters: 1, returnType: 1 },
          ignoreComments: false,
          ignoredNodes: ['TSUnionType', 'TSIntersectionType'],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: {
            CallExpression: true,
            AwaitExpression: true,
            NewExpression: true
          },
          outerIIFEBody: 1,
          SwitchCase: 1,
          tabLength: 2,
          VariableDeclarator: 1
        }],
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/jsx-quotes': ['error', 'prefer-single'],
        'react/react-in-jsx-scope': 'off',

        '@stylistic/no-multiple-empty-lines': ['warn', {
          max: 2,
          maxEOF: 1
        }],
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true
          }
        ],

        // Disable prop-types rule as we're using TypeScript
        'react/prop-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'error'
      }
    },
    {
      // disable type-aware linting on JS files
      files: ['**/*.mjs', '**/*.cjs', '**/*.js'],
      ...tseslint.configs.disableTypeChecked
    },
    {
      // enable vitest rules on test files
      files: testFiles,
      ...vitestPlugin.configs.recommended
    }
  )
}
