import { unformattedDateObjectives } from '@modules/Objectives/utils/unformattedDateObjectives'

describe('unformattedDateObjectives', () => {
  describe('Cenários de sucesso', () => {
    it('deve desformatar data MM/YYYY para YYYY-MM-01', () => {
      // Arrange
      const formattedDate = '03/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-03-01')
    })

    it('deve desformatar data com mês de um dígito', () => {
      // Arrange
      const formattedDate = '1/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-1-01')
    })

    it('deve desformatar data com mês de dois dígitos', () => {
      // Arrange
      const formattedDate = '12/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-12-01')
    })

    it('deve desformatar data de ano diferente', () => {
      // Arrange
      const formattedDate = '06/2025'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2025-06-01')
    })

    it('deve desformatar data de janeiro', () => {
      // Arrange
      const formattedDate = '01/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-01-01')
    })

    it('deve desformatar data de dezembro', () => {
      // Arrange
      const formattedDate = '12/2023'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2023-12-01')
    })
  })

  describe('Cenários de borda', () => {
    it('deve lidar com data com espaços extras', () => {
      // Arrange
      const formattedDate = ' 03/2024 '

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe(' 03-2024-01')
    })

    it('deve lidar com mês com zero à esquerda', () => {
      // Arrange
      const formattedDate = '03/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-03-01')
    })

    it('deve lidar com mês sem zero à esquerda', () => {
      // Arrange
      const formattedDate = '3/2024'

      // Act
      const result = unformattedDateObjectives(formattedDate)

      // Assert
      expect(result).toBe('2024-3-01')
    })
  })

  describe('Cenários específicos', () => {
    it('deve sempre retornar dia 01', () => {
      // Arrange
      const testCases = [
        { input: '01/2024', expected: '2024-01-01' },
        { input: '06/2024', expected: '2024-06-01' },
        { input: '12/2024', expected: '2024-12-01' },
      ]

      testCases.forEach(({ input, expected }) => {
        // Act
        const result = unformattedDateObjectives(input)

        // Assert
        expect(result).toBe(expected)
        expect(result).toEndWith('-01')
      })
    })

    it('deve preservar o ano original', () => {
      // Arrange
      const testCases = [
        { input: '03/2020', expectedYear: '2020' },
        { input: '03/2024', expectedYear: '2024' },
        { input: '03/2030', expectedYear: '2030' },
      ]

      testCases.forEach(({ input, expectedYear }) => {
        // Act
        const result = unformattedDateObjectives(input)

        // Assert
        expect(result).toStartWith(expectedYear)
      })
    })

    it('deve preservar o mês original', () => {
      // Arrange
      const testCases = [
        { input: '01/2024', expectedMonth: '01' },
        { input: '06/2024', expectedMonth: '06' },
        { input: '12/2024', expectedMonth: '12' },
      ]

      testCases.forEach(({ input, expectedMonth }) => {
        // Act
        const result = unformattedDateObjectives(input)

        // Assert
        expect(result).toContain(`-${expectedMonth}-`)
      })
    })
  })
})

