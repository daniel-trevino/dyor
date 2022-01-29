import { getContractAddress, USDC_ADDRESSES } from '../contracts'

describe('contracts', () => {
  test('It should return USDC mainnet address', () => {
    const value = getContractAddress('USDC', 'mainnet')
    expect(value).toEqual(USDC_ADDRESSES.mainnet)
  })
})
