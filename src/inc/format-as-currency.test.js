import formatAsCurrency from './format-as-currency'

describe('The formatAsCurrency function', () => {

  it('returns an empty string when called with an invalid type', () => {
    expect(formatAsCurrency(456332)).toBe('')
  })

  it('removes non-numeric characters', () => {
    expect(formatAsCurrency('re123 4.56uh')).toBe('1234.56')
  })

  it('allows only one decimal point', () => {
    expect(formatAsCurrency('12345.67.89')).toBe('12345.67')
  })

  it('is limited to 2 decimal places', () => {
    expect(formatAsCurrency('123.4567')).toBe('123.45')
  })

  it('allows a trailing decimal point', () => {
    expect(formatAsCurrency('12345.')).toBe('12345.')
  })

})