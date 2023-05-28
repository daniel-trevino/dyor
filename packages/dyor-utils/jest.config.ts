import type { Config } from 'jest'
import { type PackageJson } from 'type-fest'
import base from 'jest-configs/jest-server'
import path from 'path'
import fs from 'fs-extra'

const packageJsonPath = path.join('./', 'package.json')
const packageJson = fs.readJSONSync(packageJsonPath) as PackageJson

const fromRoot = (d): string => path.join(__dirname, d)

const config: Config = {
  ...base,
  roots: [fromRoot('.')],
  displayName: `${packageJson.name} tests`,
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
}

export default config
