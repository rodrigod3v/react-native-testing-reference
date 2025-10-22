import { formatToCapitalizeString } from './formatToCapitalizeString'

describe('formatToCapitalizeString', () => {
  it('capitaliza primeira letra de cada palavra', () => {
    expect(formatToCapitalizeString('joão silva')).toBe('João Silva')
    expect(formatToCapitalizeString('maria dos santos')).toBe('Maria Dos Santos')
    expect(formatToCapitalizeString('pedro alves da costa')).toBe('Pedro Alves Da Costa')
  })

  it('capitaliza palavras individuais', () => {
    expect(formatToCapitalizeString('joão')).toBe('João')
    expect(formatToCapitalizeString('SILVA')).toBe('Silva')
    expect(formatToCapitalizeString('maria')).toBe('Maria')
  })

  it('trata strings com espaços extras', () => {
    expect(formatToCapitalizeString('  joão   silva  ')).toBe('João Silva')
    expect(formatToCapitalizeString('maria    dos    santos')).toBe('Maria Dos Santos')
  })

  it('preserva espaços extras quando trimTrailingWhiteSpaces=false', () => {
    expect(formatToCapitalizeString('  joão   silva  ', false)).toBe('  João   Silva  ')
    expect(formatToCapitalizeString('maria    dos    santos', false)).toBe('Maria    Dos    Santos')
  })

  it('trata strings vazias', () => {
    expect(formatToCapitalizeString('')).toBe('')
    expect(formatToCapitalizeString('   ')).toBe('')
  })

  it('trata valores falsy', () => {
    expect(formatToCapitalizeString(null as any)).toBe('')
    expect(formatToCapitalizeString(undefined as any)).toBe('')
  })

  it('trata strings com números', () => {
    expect(formatToCapitalizeString('joão123 silva456')).toBe('João123 Silva456')
    expect(formatToCapitalizeString('123 abc 456')).toBe('123 Abc 456')
  })

  it('trata strings com caracteres especiais', () => {
    expect(formatToCapitalizeString('joão-silva')).toBe('João-Silva')
    expect(formatToCapitalizeString('maria_dos_santos')).toBe('Maria_Dos_Santos')
    expect(formatToCapitalizeString('pedro.alves')).toBe('Pedro.Alves')
  })

  it('trata strings já capitalizadas', () => {
    expect(formatToCapitalizeString('João Silva')).toBe('João Silva')
    expect(formatToCapitalizeString('MARIA DOS SANTOS')).toBe('Maria Dos Santos')
  })

  it('trata strings com acentos', () => {
    expect(formatToCapitalizeString('josé da silva')).toBe('José Da Silva')
    expect(formatToCapitalizeString('maria josé')).toBe('Maria José')
    expect(formatToCapitalizeString('andré luiz')).toBe('André Luiz')
  })

  it('trata strings com hífens e apóstrofos', () => {
    expect(formatToCapitalizeString('joão-silva')).toBe('João-Silva')
    expect(formatToCapitalizeString("d'angelo")).toBe("D'angelo")
    expect(formatToCapitalizeString('o\'connor')).toBe("O'connor")
  })
})

