import { nextDate } from './nextDate'

describe('nextDate', () => {
  it('incrementa o mês dentro do mesmo ano', () => {
    expect(nextDate('2024-01')).toBe('2024-02')
    expect(nextDate('2024-09')).toBe('2024-10')
    expect(nextDate('2024-11')).toBe('2024-12')
  })

  it('vira para o próximo ano após dezembro', () => {
    expect(nextDate('2024-12')).toBe('2025-01')
  })
})


