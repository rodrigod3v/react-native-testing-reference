import {
  formatStringToFloatSmall,
  formatStringToFloatFull,
  formatStringToFloatFullDot
} from './formatStringToFloat'

describe('formatStringToFloat', () => {
  describe('formatStringToFloatSmall', () => {
    it('converte string com vírgula para float', () => {
      expect(formatStringToFloatSmall('123,45')).toBe(123.45)
      expect(formatStringToFloatSmall('0,5')).toBe(0.5)
      expect(formatStringToFloatSmall('1000,99')).toBe(1000.99)
    })

    it('converte string sem vírgula para número', () => {
      expect(formatStringToFloatSmall('123')).toBe(123)
      expect(formatStringToFloatSmall('0')).toBe(0)
      expect(formatStringToFloatSmall('1000')).toBe(1000)
    })

    it('retorna 0 para valores falsy', () => {
      expect(formatStringToFloatSmall('')).toBe(0)
      expect(formatStringToFloatSmall(null as any)).toBe(0)
      expect(formatStringToFloatSmall(undefined as any)).toBe(0)
    })

    it('converte números passados como string', () => {
      expect(formatStringToFloatSmall('123')).toBe(123)
      expect(formatStringToFloatSmall('123.45')).toBe(123.45)
    })
  })

  describe('formatStringToFloatFull', () => {
    it('converte string com vírgula para float', () => {
      expect(formatStringToFloatFull('123,45')).toBe(123.45)
      expect(formatStringToFloatFull('0,5')).toBe(0.5)
      expect(formatStringToFloatFull('1000,99')).toBe(1000.99)
    })

    it('converte string sem vírgula para número', () => {
      expect(formatStringToFloatFull('123')).toBe(123)
      expect(formatStringToFloatFull('0')).toBe(0)
      expect(formatStringToFloatFull('1000')).toBe(1000)
    })

    it('retorna 0 para valores falsy', () => {
      expect(formatStringToFloatFull('')).toBe(0)
      expect(formatStringToFloatFull(null as any)).toBe(0)
      expect(formatStringToFloatFull(undefined as any)).toBe(0)
    })

    it('converte números passados como string', () => {
      expect(formatStringToFloatFull('123')).toBe(123)
      expect(formatStringToFloatFull('123.45')).toBe(123.45)
    })
  })

  describe('formatStringToFloatFullDot', () => {
    it('converte ponto para vírgula', () => {
      expect(formatStringToFloatFullDot('123.45')).toBe('123,45')
      expect(formatStringToFloatFullDot('0.5')).toBe('0,5')
      expect(formatStringToFloatFullDot('1000.99')).toBe('1000,99')
    })

    it('converte vírgula para ponto', () => {
      expect(formatStringToFloatFullDot('123,45')).toBe('123.45')
      expect(formatStringToFloatFullDot('0,5')).toBe('0.5')
      expect(formatStringToFloatFullDot('1000,99')).toBe('1000.99')
    })

    it('converte múltiplos pontos e vírgulas', () => {
      expect(formatStringToFloatFullDot('1.234,56')).toBe('1,234.56')
      expect(formatStringToFloatFullDot('1,234.56')).toBe('1.234,56')
    })

    it('retorna "0" para valores falsy', () => {
      expect(formatStringToFloatFullDot('')).toBe('0')
      expect(formatStringToFloatFullDot(null as any)).toBe('0')
      expect(formatStringToFloatFullDot(undefined as any)).toBe('0')
    })

    it('preserva strings sem pontos ou vírgulas', () => {
      expect(formatStringToFloatFullDot('123')).toBe('123')
      expect(formatStringToFloatFullDot('abc')).toBe('abc')
    })
  })
})

