import { validationEmail } from './validationEmail'

describe('validationEmail', () => {
  describe('emails válidos', () => {
    it('valida emails básicos', () => {
      expect(validationEmail('test@example.com')).toBe(true)
      expect(validationEmail('user@domain.org')).toBe(true)
      expect(validationEmail('admin@site.net')).toBe(true)
    })

    it('valida emails com subdomínios', () => {
      expect(validationEmail('user@mail.example.com')).toBe(true)
      expect(validationEmail('test@sub.domain.co.uk')).toBe(true)
    })

    it('valida emails com caracteres especiais no nome', () => {
      expect(validationEmail('user.name@example.com')).toBe(true)
      expect(validationEmail('user_name@example.com')).toBe(true)
      expect(validationEmail('user-name@example.com')).toBe(true)
      expect(validationEmail('user+tag@example.com')).toBe(true)
    })

    it('remove espaços em branco', () => {
      expect(validationEmail('  test@example.com  ')).toBe(true)
      expect(validationEmail('\ttest@example.com\n')).toBe(true)
    })
  })

  describe('emails inválidos', () => {
    it('rejeita emails sem @', () => {
      expect(validationEmail('testexample.com')).toBe(false)
      expect(validationEmail('userexample.com')).toBe(false)
    })

    it('rejeita emails com múltiplos @', () => {
      expect(validationEmail('test@@example.com')).toBe(false)
      expect(validationEmail('test@exam@ple.com')).toBe(false)
    })

    it('rejeita emails sem domínio', () => {
      expect(validationEmail('test@')).toBe(false)
      expect(validationEmail('user@.com')).toBe(false)
    })

    it('rejeita emails sem extensão', () => {
      expect(validationEmail('test@example')).toBe(false)
      expect(validationEmail('user@domain')).toBe(false)
    })

    it('rejeita emails com extensão muito curta', () => {
      expect(validationEmail('test@example.c')).toBe(false)
      expect(validationEmail('user@domain.x')).toBe(false)
    })

    it('rejeita emails com domínio inválido', () => {
      expect(validationEmail('test@.example.com')).toBe(false)
      expect(validationEmail('user@example..com')).toBe(false)
      expect(validationEmail('test@-example.com')).toBe(false)
    })

    it('rejeita valores falsy', () => {
      expect(validationEmail('')).toBe(false)
      expect(validationEmail(null as any)).toBe(false)
      expect(validationEmail(undefined as any)).toBe(false)
    })

    it('rejeita emails com caracteres inválidos', () => {
      expect(validationEmail('test@exam ple.com')).toBe(false)
      expect(validationEmail('test@exam[ple.com')).toBe(false)
      expect(validationEmail('test@exam]ple.com')).toBe(false)
    })
  })

  describe('casos especiais', () => {
    it('valida emails com números', () => {
      expect(validationEmail('user123@example.com')).toBe(true)
      expect(validationEmail('test@domain123.com')).toBe(true)
    })

    it('valida emails com extensões compostas', () => {
      expect(validationEmail('test@example.co.uk')).toBe(true)
      expect(validationEmail('user@domain.com.br')).toBe(true)
    })

    it('rejeita emails começando com ponto', () => {
      expect(validationEmail('.test@example.com')).toBe(false)
      expect(validationEmail('test@.example.com')).toBe(false)
    })

    it('rejeita emails terminando com ponto', () => {
      expect(validationEmail('test.@example.com')).toBe(false)
      expect(validationEmail('test@example.com.')).toBe(false)
    })
  })
})

