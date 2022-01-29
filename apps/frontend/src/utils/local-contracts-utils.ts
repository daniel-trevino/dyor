import hardhatContracts from '../../generated/contracts/hardhat_contracts.json'

export const getLocalContractAbiFromName = (name: string): any =>
  hardhatContracts[31337].localhost.contracts[name]?.abi
