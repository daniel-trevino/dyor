import { decimalPrecision } from '../numbers-utils'

describe('decimalPrecision', () => {
  test('should handle string numbers and return a number as string with 2 decimals', () => {
    const input = '1.999999999999999999'
    const result = decimalPrecision(input)
    expect(result).toBe('1.99')
  })
  test('should return number with only 1 decimal', () => {
    const input = '1.9'
    const result = decimalPrecision(input)
    expect(result).toBe('1.9')
  })
  test('should return 0', () => {
    const input = '0'
    const input2 = 0
    const input3 = undefined
    const input4 = NaN
    const result = decimalPrecision(input)
    const result2 = decimalPrecision(input2)
    const result3 = decimalPrecision(input3)
    const result4 = decimalPrecision(input4)
    expect(result).toBe('0')
    expect(result2).toBe('0')
    expect(result3).toBe('0')
    expect(result4).toBe('0')
  })
})
