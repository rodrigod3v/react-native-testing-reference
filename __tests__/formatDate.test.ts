import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formata data ISO string com padrão padrão', () => {
    const result = formatDate('2024-01-15T10:30:00Z')
    expect(result).toContain('15 de janeiro de 2024')
  })

  it('formata data ISO string com padrão customizado', () => {
    const result = formatDate('2024-01-15T10:30:00Z', 'dd/MM/yyyy')
    expect(result).toBe('15/01/2024')
  })

  it('formata objeto Date', () => {
    const date = new Date('2024-01-15T10:30:00Z')
    const result = formatDate(date, 'dd/MM/yyyy')
    expect(result).toBe('15/01/2024')
  })

  it('retorna placeholder para string vazia', () => {
    expect(formatDate('')).toBe(' - ')
    expect(formatDate('   ')).toBe(' - ')
  })

  it('retorna placeholder para valores falsy', () => {
    expect(formatDate(null as any)).toBe(' - ')
    expect(formatDate(undefined as any)).toBe(' - ')
  })

  it('formata data com diferentes padrões', () => {
    const date = '2024-12-25T10:30:00Z'

    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-12-25')
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('12/25/2024')
    expect(formatDate(date, 'dd-MM-yyyy')).toBe('25-12-2024')
  })
})

