import { BigNumber } from 'ethers'

export type TransactionReceipt = {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  gasUsed: BigNumber
  logsBloom: string
  blockHash: string
  transactionHash: string
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: BigNumber
  effectiveGasPrice: BigNumber
  byzantium: boolean
  type: number
  status?: number
}

export type SendTransactionReturn = {
  hash: string
  wait: () => Promise<TransactionReceipt>
}
