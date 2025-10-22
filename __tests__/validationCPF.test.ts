import { validationCPF } from './validationCPF'

describe('validationCPF', () => {
  describe('CPFs válidos', () => {
    it('valida CPF válido', () => {
      expect(validationCPF('11144477735')).toBe(true)
      expect(validationCPF('123.456.789-09')).toBe(true)
      expect(validationCPF('987.654.321-00')).toBe(true)
    })

    it('valida CPF com formatação', () => {
      expect(validationCPF('111.444.777-35')).toBe(true)
      expect(validationCPF('123.456.789-09')).toBe(true)
    })

    it('valida CPF apenas com números', () => {
      expect(validationCPF('11144477735')).toBe(true)
      expect(validationCPF('12345678909')).toBe(true)
    })
  })

  describe('CPFs inválidos', () => {
    it('rejeita CPF com todos os dígitos iguais', () => {
      expect(validationCPF('00000000000')).toBe(false)
      expect(validationCPF('11111111111')).toBe(false)
      expect(validationCPF('22222222222')).toBe(false)
      expect(validationCPF('33333333333')).toBe(false)
      expect(validationCPF('44444444444')).toBe(false)
      expect(validationCPF('55555555555')).toBe(false)
      expect(validationCPF('66666666666')).toBe(false)
      expect(validationCPF('77777777777')).toBe(false)
      expect(validationCPF('88888888888')).toBe(false)
      expect(validationCPF('99999999999')).toBe(false)
    })

    it('rejeita CPF com tamanho incorreto', () => {
      expect(validationCPF('1234567890')).toBe(false) // 10 dígitos
      expect(validationCPF('123456789012')).toBe(false) // 12 dígitos
    })

    it('rejeita CPF com dígitos verificadores incorretos', () => {
      expect(validationCPF('12345678901')).toBe(false)
      expect(validationCPF('98765432101')).toBe(false)
    })

    it('rejeita string vazia', () => {
      expect(validationCPF('')).toBe(false)
    })

    it('rejeita CPF com caracteres não numéricos (após limpeza)', () => {
      expect(validationCPF('abc123def456ghi789jkl01')).toBe(false)
    })
  })

  describe('casos especiais', () => {
    it('limpa caracteres não numéricos antes da validação', () => {
      expect(validationCPF('111.444.777-35')).toBe(true)
      expect(validationCPF('111-444-777-35')).toBe(true)
      expect(validationCPF('111 444 777 35')).toBe(true)
    })

    it('trata valores null/undefined', () => {
      expect(validationCPF(null as any)).toBe(false)
      expect(validationCPF(undefined as any)).toBe(false)
    })
  })
})

