import { formatDateToMMYYYY } from '@modules/Objectives/utils/formatDateToMMYYYY'

describe('formatDateToMMYYYY', () => {
  describe('Cenários de sucesso', () => {
    it('deve formatar data ISO corretamente para MM/YYYY', () => {
      // Arrange
      const isoDate = '2024-03-15T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('03/2024')
    })

    it('deve formatar data ISO sem horário para MM/YYYY', () => {
      // Arrange
      const isoDate = '2023-12-01'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('12/2023')
    })

    it('deve formatar data com mês de um dígito', () => {
      // Arrange
      const isoDate = '2024-01-15T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('01/2024')
    })

    it('deve formatar data com mês de dois dígitos', () => {
      // Arrange
      const isoDate = '2024-11-30T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('11/2024')
    })

    it('deve formatar data de ano diferente', () => {
      // Arrange
      const isoDate = '2025-06-15T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('06/2025')
    })
  })

  describe('Cenários de borda', () => {
    it('deve retornar undefined para string vazia', () => {
      // Arrange
      const emptyString = ''

      // Act
      const result = formatDateToMMYYYY(emptyString)

      // Assert
      expect(result).toBeUndefined()
    })

    it('deve retornar undefined para null', () => {
      // Arrange
      const nullValue = null as any

      // Act
      const result = formatDateToMMYYYY(nullValue)

      // Assert
      expect(result).toBeUndefined()
    })

    it('deve retornar undefined para undefined', () => {
      // Arrange
      const undefinedValue = undefined as any

      // Act
      const result = formatDateToMMYYYY(undefinedValue)

      // Assert
      expect(result).toBeUndefined()
    })

    it('deve retornar undefined para string inválida', () => {
      // Arrange
      const invalidString = 'data-invalida'

      // Act
      const result = formatDateToMMYYYY(invalidString)

      // Assert
      expect(result).toBeUndefined()
    })
  })

  describe('Cenários específicos de data', () => {
    it('deve formatar primeiro dia do ano', () => {
      // Arrange
      const isoDate = '2024-01-01T00:00:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('01/2024')
    })

    it('deve formatar último dia do ano', () => {
      // Arrange
      const isoDate = '2024-12-31T23:59:59.999Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('12/2024')
    })

    it('deve formatar data de fevereiro (mês mais curto)', () => {
      // Arrange
      const isoDate = '2024-02-29T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('02/2024')
    })

    it('deve formatar data de ano bissexto', () => {
      // Arrange
      const isoDate = '2024-02-29T10:30:00.000Z'

      // Act
      const result = formatDateToMMYYYY(isoDate)

      // Assert
      expect(result).toBe('02/2024')
    })
  })
})
