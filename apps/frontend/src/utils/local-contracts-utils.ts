import * as value from '../../generated/typechain'

// eslint-disable-next-line import/namespace
export const getLocalContractAbiFromName = (name: string): any => value[`${name}__factory`].abi
