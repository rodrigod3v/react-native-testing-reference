import { sortPriorityBanks } from '@modules/Budget/modules/Integration/utils/helpers/sortPriorityBanks'
import { IBank } from '@modules/Budget/modules/Integration/types'

describe('sortPriorityBanks', () => {
  const createMockBank = (name: string): IBank => ({
    institutionCode: '001',
    image: 'bank-icon.png',
    name,
  })

  describe('Cenários de sucesso', () => {
    it('deve ordenar bancos por prioridade definida', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Bradesco Pessoa Física'),
        createMockBank('Itaú'),
        createMockBank('Nubank'),
        createMockBank('Banco do Brasil'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Itaú')
      expect(result[1].name).toBe('Nubank')
      expect(result[2].name).toBe('Bradesco Pessoa Física')
      expect(result[3].name).toBe('Banco do Brasil')
    })

    it('deve colocar bancos prioritários antes dos não prioritários', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Banco XYZ'),
        createMockBank('Itaú'),
        createMockBank('Banco ABC'),
        createMockBank('Nubank'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Itaú')
      expect(result[1].name).toBe('Nubank')
      expect(result[2].name).toBe('Banco ABC')
      expect(result[3].name).toBe('Banco XYZ')
    })

    it('deve ordenar bancos não prioritários alfabeticamente', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Banco Z'),
        createMockBank('Banco A'),
        createMockBank('Banco M'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Banco A')
      expect(result[1].name).toBe('Banco M')
      expect(result[2].name).toBe('Banco Z')
    })

    it('deve manter ordem de prioridade correta para todos os bancos prioritários', () => {
      // Arrange
      const priorityBanks = [
        'Itaú',
        'Nubank',
        'Banco Santander Pessoa Física',
        'Bradesco Pessoa Física',
        'BTG Banking',
        'Banco do Brasil',
        'Banco XP S.A.',
        'Banco PAN',
        'CAIXA',
        'Safra PF',
      ]
      const banks: IBank[] = priorityBanks.map(name => createMockBank(name)).reverse()

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      priorityBanks.forEach((expectedName, index) => {
        expect(result[index].name).toBe(expectedName)
      })
    })
  })

  describe('Cenários de borda', () => {
    it('deve retornar array vazio quando input é array vazio', () => {
      // Arrange
      const banks: IBank[] = []

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('deve retornar array com um elemento quando input tem um elemento', () => {
      // Arrange
      const banks: IBank[] = [createMockBank('Itaú')]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Itaú')
    })

    it('deve lidar com bancos duplicados', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Itaú'),
        createMockBank('Nubank'),
        createMockBank('Itaú'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('Itaú')
      expect(result[1].name).toBe('Itaú')
      expect(result[2].name).toBe('Nubank')
    })

    it('deve manter propriedades originais dos bancos', () => {
      // Arrange
      const banks: IBank[] = [
        {
          institutionCode: '341',
          image: 'itau-icon.png',
          name: 'Itaú',
        },
        {
          institutionCode: '260',
          image: 'nubank-icon.png',
          name: 'Nubank',
        },
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0]).toEqual({
        institutionCode: '341',
        image: 'itau-icon.png',
        name: 'Itaú',
      })
      expect(result[1]).toEqual({
        institutionCode: '260',
        image: 'nubank-icon.png',
        name: 'Nubank',
      })
    })
  })

  describe('Cenários com diferentes tipos de bancos', () => {
    it('deve ordenar corretamente bancos com nomes similares', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Banco Santander Pessoa Física'),
        createMockBank('Banco Santander Empresas'),
        createMockBank('Santander'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Banco Santander Pessoa Física')
      expect(result[1].name).toBe('Banco Santander Empresas')
      expect(result[2].name).toBe('Santander')
    })

    it('deve ordenar corretamente bancos com nomes que contêm números', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Banco 123'),
        createMockBank('Banco ABC'),
        createMockBank('Banco XP S.A.'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Banco XP S.A.')
      expect(result[1].name).toBe('Banco 123')
      expect(result[2].name).toBe('Banco ABC')
    })

    it('deve ordenar corretamente bancos com caracteres especiais', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Banco A&B'),
        createMockBank('Banco A-Z'),
        createMockBank('Banco XP S.A.'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('Banco XP S.A.')
      expect(result[1].name).toBe('Banco A&B')
      expect(result[2].name).toBe('Banco A-Z')
    })
  })

  describe('Cenários de ordenação alfabética', () => {
    it('deve ordenar alfabeticamente bancos não prioritários', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('Z Bank'),
        createMockBank('A Bank'),
        createMockBank('M Bank'),
        createMockBank('L Bank'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('A Bank')
      expect(result[1].name).toBe('L Bank')
      expect(result[2].name).toBe('M Bank')
      expect(result[3].name).toBe('Z Bank')
    })

    it('deve considerar case sensitivity na ordenação alfabética', () => {
      // Arrange
      const banks: IBank[] = [
        createMockBank('banco minúsculo'),
        createMockBank('BANCO MAIÚSCULO'),
        createMockBank('Banco Capitalizado'),
      ]

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result[0].name).toBe('BANCO MAIÚSCULO')
      expect(result[1].name).toBe('Banco Capitalizado')
      expect(result[2].name).toBe('banco minúsculo')
    })
  })

  describe('Cenários de performance', () => {
    it('deve lidar com lista grande de bancos', () => {
      // Arrange
      const banks: IBank[] = Array.from({ length: 100 }, (_, index) => 
        createMockBank(`Banco ${index}`)
      )
      banks.push(createMockBank('Itaú'))
      banks.push(createMockBank('Nubank'))

      // Act
      const result = sortPriorityBanks(banks)

      // Assert
      expect(result).toHaveLength(102)
      expect(result[0].name).toBe('Itaú')
      expect(result[1].name).toBe('Nubank')
    })
  })
})
