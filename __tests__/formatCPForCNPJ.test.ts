import { formatCPForCNPJ } from './formatCPForCNPJ'

describe('formatCPForCNPJ', () => {
  describe('formatação de CPF (11 dígitos)', () => {
    it('formata CPF completo', () => {
      expect(formatCPForCNPJ('12345678901')).toBe('123.456.789-01')
    })

    it('formata CPF com números', () => {
      expect(formatCPForCNPJ(12345678901)).toBe('123.456.789-01')
    })

    it('formata CPF parcialmente digitado', () => {
      expect(formatCPForCNPJ('123456789')).toBe('123.456.789')
      expect(formatCPForCNPJ('1234567890')).toBe('123.456.789-0')
    })

    it('remove caracteres não numéricos', () => {
      expect(formatCPForCNPJ('123.456.789-01')).toBe('123.456.789-01')
      expect(formatCPForCNPJ('123abc456def789ghi01')).toBe('123.456.789-01')
    })
  })

  describe('formatação de CNPJ (12+ dígitos)', () => {
    it('formata CNPJ completo', () => {
      expect(formatCPForCNPJ('12345678000195')).toBe('12.345.678/0001-95')
    })

    it('formata CNPJ com números', () => {
      expect(formatCPForCNPJ(12345678000195)).toBe('12.345.678/0001-95')
    })

    it('formata CNPJ parcialmente digitado', () => {
      expect(formatCPForCNPJ('123456780001')).toBe('12.345.678/0001')
      expect(formatCPForCNPJ('1234567800019')).toBe('12.345.678/0001-9')
    })

    it('remove caracteres não numéricos', () => {
      expect(formatCPForCNPJ('12.345.678/0001-95')).toBe('12.345.678/0001-95')
      expect(formatCPForCNPJ('12abc345def678ghi0001jkl95')).toBe('12.345.678/0001-95')
    })
  })

  describe('casos especiais', () => {
    it('trata string vazia', () => {
      expect(formatCPForCNPJ('')).toBe('')
    })

    it('limita o tamanho máximo para CPF', () => {
      expect(formatCPForCNPJ('123456789012')).toBe('123.456.789-01')
    })

    it('limita o tamanho máximo para CNPJ', () => {
      expect(formatCPForCNPJ('12345678000195123')).toBe('12.345.678/0001-95')
    })
  })
})

