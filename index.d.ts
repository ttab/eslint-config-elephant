import type { Config } from 'eslint/config'

interface ElephantOptions {
  reactVersion: string
  tsconfigRootDir?: string
  testFiles?: string[]
  ignores?: string[]
}

export default function elephant(options: ElephantOptions): Config[]
