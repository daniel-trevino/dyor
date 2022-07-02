import fs from 'fs'
import path from 'path'

export const folderExists = (folderDirPath: string): void => {
  if (!fs.existsSync(folderDirPath)) {
    fs.mkdirSync(folderDirPath)
  }
}

export const jsonStringify = (value: string): string => JSON.stringify(value, null, 2)

const EXPORTED_GENERATED_DIR = path.join(__dirname, '../../frontend/generated')
const EXPORTED_HARDHAT_DIR = path.join(__dirname, '../../hardhat')
const EXPORTED_GENERATED_CONTRACTS_DIR = path.join(EXPORTED_GENERATED_DIR, '/contracts')
const EXPORTED_TYPECHAIN_TYPES_DIR = path.join(EXPORTED_GENERATED_DIR, '/types')

export const paths = {
  EXPORTED_GENERATED_DIR,
  EXPORTED_HARDHAT_DIR,
  EXPORTED_GENERATED_CONTRACTS_DIR,
  EXPORTED_TYPECHAIN_TYPES_DIR,
}
