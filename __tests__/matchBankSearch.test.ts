import { matchBankSearch } from '@modules/Budget/modules/Integration/utils/helpers/matchBankSearch'
import { IBank } from '@modules/Budget/modules/Integration/types'

describe('matchBankSearch', () => {
  const mockBank: IBank = {
    institutionCode: '001',
    image: 'bank-icon.png',
    name: 'Banco do Brasil',
    organizationName: 'Banco do Brasil S.A.',
    parentOrganizationName: 'Banco do Brasil',
  }

  describe('Cenários de sucesso', () => {
    it('deve retornar true quando busca por nome do banco', () => {
      // Arrange
      const search = 'brasil'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve retornar true quando busca por nome da organização', () => {
      // Arrange
      const search = 's.a.'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve retornar true quando busca por nome da organização pai', () => {
      // Arrange
      const search = 'brasil'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve ser case insensitive', () => {
      // Arrange
      const search = 'BRASIL'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve ignorar acentos na busca', () => {
      // Arrange
      const bankWithAccents: IBank = {
        ...mockBank,
        name: 'Caixa Econômica Federal',
        organizationName: 'Caixa Econômica Federal',
      }
      const search = 'economica'

      // Act
      const result = matchBankSearch(search, bankWithAccents)

      // Assert
      expect(result).toBe(true)
    })

    it('deve funcionar com busca parcial', () => {
      // Arrange
      const search = 'banco'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })
  })

  describe('Cenários de não correspondência', () => {
    it('deve retornar false quando não há correspondência', () => {
      // Arrange
      const search = 'nubank'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(false)
    })

    it('deve retornar false para busca que não corresponde a nenhum campo', () => {
      // Arrange
      const search = 'itau'

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('Cenários de borda', () => {
    it('deve retornar true para string vazia', () => {
      // Arrange
      const search = ''

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve retornar true para string com apenas espaços', () => {
      // Arrange
      const search = '   '

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve funcionar quando organizationName é undefined', () => {
      // Arrange
      const bankWithoutOrgName: IBank = {
        ...mockBank,
        organizationName: undefined,
      }
      const search = 'brasil'

      // Act
      const result = matchBankSearch(search, bankWithoutOrgName)

      // Assert
      expect(result).toBe(true)
    })

    it('deve funcionar quando parentOrganizationName é undefined', () => {
      // Arrange
      const bankWithoutParentName: IBank = {
        ...mockBank,
        parentOrganizationName: undefined,
      }
      const search = 'brasil'

      // Act
      const result = matchBankSearch(search, bankWithoutParentName)

      // Assert
      expect(result).toBe(true)
    })

    it('deve usar name como fallback quando organizationName é undefined', () => {
      // Arrange
      const bankWithOnlyName: IBank = {
        ...mockBank,
        organizationName: undefined,
        name: 'Banco Teste',
      }
      const search = 'teste'

      // Act
      const result = matchBankSearch(search, bankWithOnlyName)

      // Assert
      expect(result).toBe(true)
    })
  })

  describe('Cenários com diferentes bancos', () => {
    it('deve funcionar com banco Nubank', () => {
      // Arrange
      const nubank: IBank = {
        institutionCode: '260',
        image: 'nubank-icon.png',
        name: 'Nubank',
        organizationName: 'Nu Pagamentos S.A.',
        parentOrganizationName: 'Nu Holdings',
      }
      const search = 'nubank'

      // Act
      const result = matchBankSearch(search, nubank)

      // Assert
      expect(result).toBe(true)
    })

    it('deve funcionar com banco Itaú', () => {
      // Arrange
      const itau: IBank = {
        institutionCode: '341',
        image: 'itau-icon.png',
        name: 'Itaú Unibanco',
        organizationName: 'Itaú Unibanco S.A.',
        parentOrganizationName: 'Itaúsa',
      }
      const search = 'itau'

      // Act
      const result = matchBankSearch(search, itau)

      // Assert
      expect(result).toBe(true)
    })

    it('deve funcionar com busca por nome da organização pai', () => {
      // Arrange
      const itau: IBank = {
        institutionCode: '341',
        image: 'itau-icon.png',
        name: 'Itaú Unibanco',
        organizationName: 'Itaú Unibanco S.A.',
        parentOrganizationName: 'Itaúsa',
      }
      const search = 'itausa'

      // Act
      const result = matchBankSearch(search, itau)

      // Assert
      expect(result).toBe(true)
    })
  })

  describe('Cenários com normalização de texto', () => {
    it('deve normalizar texto com acentos', () => {
      // Arrange
      const bankWithAccents: IBank = {
        ...mockBank,
        name: 'Caixa Econômica Federal',
        organizationName: 'Caixa Econômica Federal',
      }
      const search = 'economica' // sem acento

      // Act
      const result = matchBankSearch(search, bankWithAccents)

      // Assert
      expect(result).toBe(true)
    })

    it('deve normalizar busca com acentos', () => {
      // Arrange
      const search = 'econômica' // com acento

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(false) // porque o mockBank não tem acentos
    })

    it('deve ignorar espaços extras', () => {
      // Arrange
      const search = '  brasil  '

      // Act
      const result = matchBankSearch(search, mockBank)

      // Assert
      expect(result).toBe(true)
    })
  })
})
