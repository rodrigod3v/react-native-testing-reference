import { formatBrlCurrency } from './formatBrlCurrency'

describe('formatBrlCurrency', () => {
  it('formata números positivos com moeda', () => {
    expect(formatBrlCurrency(1234.56)).toBe('R$ 1.234,56')
  })

  it('formata números negativos com espaço após o sinal de menos', () => {
    expect(formatBrlCurrency(-100)).toBe('- R$ 100,00')
  })

  it('formata sem moeda quando addCurrency=false', () => {
    expect(formatBrlCurrency(9876.5, false)).toBe('9.876,50')
  })

  it('respeita casas decimais personalizadas', () => {
    expect(formatBrlCurrency(10, true, 0)).toBe('R$ 10')
  })

  it('retorna placeholder para entradas inválidas', () => {
    expect(formatBrlCurrency(undefined as any)).toBe(' - ')
    expect(formatBrlCurrency(null as any)).toBe(' - ')
    expect(formatBrlCurrency('')).toBe(' - ')
    expect(formatBrlCurrency('abc' as any)).toBe(' - ')
  })
})
