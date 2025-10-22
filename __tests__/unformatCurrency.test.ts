import { unformatCurrency } from './unformatCurrency'

describe('unformatCurrency', () => {
  describe('com vírgula (padrão)', () => {
    it('converte valor monetário para float', () => {
      expect(unformatCurrency('1.234,56')).toBe(1234.56)
      expect(unformatCurrency('100,50')).toBe(100.5)
      expect(unformatCurrency('0,99')).toBe(0.99)
    })

    it('converte valores sem decimais', () => {
      expect(unformatCurrency('1.000')).toBe(1000)
      expect(unformatCurrency('100')).toBe(100)
      expect(unformatCurrency('0')).toBe(0)
    })

    it('remove símbolos de moeda e espaços', () => {
      expect(unformatCurrency('R$ 1.234,56')).toBe(1234.56)
      expect(unformatCurrency('R$1.234,56')).toBe(1234.56)
      expect(unformatCurrency('$ 1.234,56')).toBe(1234.56)
      expect(unformatCurrency('€ 1.234,56')).toBe(1234.56)
    })

    it('trata valores com apenas decimais', () => {
      expect(unformatCurrency('0,50')).toBe(0.5)
      expect(unformatCurrency('0,01')).toBe(0.01)
    })

    it('retorna 0 para string vazia', () => {
      expect(unformatCurrency('')).toBe(0)
    })
  })

  describe('sem vírgula (withComma=false)', () => {
    it('converte valor monetário para inteiro', () => {
      expect(unformatCurrency('1.234,56', false)).toBe(123456)
      expect(unformatCurrency('100,50', false)).toBe(10050)
      expect(unformatCurrency('0,99', false)).toBe(99)
    })

    it('converte valores sem decimais', () => {
      expect(unformatCurrency('1.000', false)).toBe(1000)
      expect(unformatCurrency('100', false)).toBe(100)
      expect(unformatCurrency('0', false)).toBe(0)
    })

    it('remove símbolos de moeda e espaços', () => {
      expect(unformatCurrency('R$ 1.234,56', false)).toBe(123456)
      expect(unformatCurrency('R$1.234,56', false)).toBe(123456)
    })
  })

  describe('casos especiais', () => {
    it('trata valores com múltiplos pontos', () => {
      expect(unformatCurrency('1.234.567,89')).toBe(1234567.89)
      expect(unformatCurrency('1.234.567.890,12')).toBe(1234567890.12)
    })

    it('trata valores com caracteres especiais', () => {
      expect(unformatCurrency('R$ 1.234,56 (aprox)')).toBe(1234.56)
      expect(unformatCurrency('1.234,56 * 2')).toBe(1234.56)
    })

    it('trata valores negativos', () => {
      expect(unformatCurrency('-1.234,56')).toBe(-1234.56)
      expect(unformatCurrency('-100,50')).toBe(-100.5)
    })

    it('trata valores com zeros à esquerda', () => {
      expect(unformatCurrency('0001.234,56')).toBe(1234.56)
      expect(unformatCurrency('0.100,50')).toBe(100.5)
    })

    it('trata valores inválidos', () => {
      expect(unformatCurrency('abc')).toBe(0)
      expect(unformatCurrency('1.234,abc')).toBe(1234)
      expect(unformatCurrency('abc,56')).toBe(0.56)
    })
  })
})

