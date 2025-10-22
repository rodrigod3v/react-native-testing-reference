import { formatTime } from './formatTime'

describe('formatTime', () => {
  it('formata números menores que 10 com zero à esquerda', () => {
    expect(formatTime(0)).toBe('00')
    expect(formatTime(1)).toBe('01')
    expect(formatTime(5)).toBe('05')
    expect(formatTime(9)).toBe('09')
  })

  it('formata números maiores ou iguais a 10 sem modificação', () => {
    expect(formatTime(10)).toBe('10')
    expect(formatTime(15)).toBe('15')
    expect(formatTime(30)).toBe('30')
    expect(formatTime(59)).toBe('59')
  })

  it('usa valor padrão 0 quando nenhum valor é fornecido', () => {
    expect(formatTime()).toBe('00')
  })

  it('trata valores decimais', () => {
    expect(formatTime(1.5)).toBe('01')
    expect(formatTime(10.7)).toBe('10')
  })

  it('trata valores negativos', () => {
    expect(formatTime(-1)).toBe('-01')
    expect(formatTime(-10)).toBe('-10')
  })

  it('trata valores muito grandes', () => {
    expect(formatTime(100)).toBe('100')
    expect(formatTime(999)).toBe('999')
  })
})




