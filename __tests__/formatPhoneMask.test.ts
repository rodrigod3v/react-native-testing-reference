import { formatPhoneMask } from './formatPhoneMask'

describe('formatPhoneMask', () => {
  it('formata telefone completo com DDD', () => {
    expect(formatPhoneMask('11987654321')).toBe('(11) 98765-4321')
  })

  it('formata telefone parcial', () => {
    expect(formatPhoneMask('1198765')).toBe('(11) 9876-5')
    expect(formatPhoneMask('1198765432')).toBe('(11) 98765-432')
  })

  it('remove caracteres não numéricos', () => {
    expect(formatPhoneMask('(11) 98765-4321')).toBe('(11) 98765-4321')
    expect(formatPhoneMask('11-98765.4321')).toBe('(11) 98765-4321')
    expect(formatPhoneMask('11abc987def65ghi432jkl1')).toBe('(11) 98765-4321')
  })

  it('formata telefone sem DDD', () => {
    expect(formatPhoneMask('987654321')).toBe('(98) 7654-321')
  })

  it('trata string vazia', () => {
    expect(formatPhoneMask('')).toBe('')
  })

  it('trata tipos não string', () => {
    expect(formatPhoneMask(null as any)).toBe('')
    expect(formatPhoneMask(undefined as any)).toBe('')
    expect(formatPhoneMask(123 as any)).toBe('')
  })

  it('formata números muito curtos', () => {
    expect(formatPhoneMask('1')).toBe('(1')
    expect(formatPhoneMask('12')).toBe('(12')
    expect(formatPhoneMask('123')).toBe('(12) 3')
  })

  it('formata números longos', () => {
    expect(formatPhoneMask('119876543210')).toBe('(11) 98765-4321')
  })
})

