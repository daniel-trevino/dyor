const DEFAULT_CURRENCY_PRECISION = 2

/**
 * Makes sure to avoid getting large string numbers like
 * 14.999999999999999999 when converting from BigNumber to string
 * This will always return the amount of digits that are needed according to our currency precision
 * @returns string
 */
export const decimalPrecision = (
  value: string | number | bigint,
  currencyPrecision: number = DEFAULT_CURRENCY_PRECISION
): string => {
  if (!value || Number.isNaN(value)) return '0'
  const numberAsString = `${value}`
  const decimalsPrecision = `^-?\\d+(?:\\.\\d{0,${currencyPrecision}})?`
  const matchResult = numberAsString.match(decimalsPrecision)
  return matchResult ? matchResult[0] : numberAsString
}
