import { omitUserProps } from '@modules/User/utils/helpers/omitUserProps'
import { IUser } from '@modules/User/types'

describe('omitUserProps', () => {
  const createMockUser = (): IUser => ({
    id: '123',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '+5511999999999',
    password: 'senha123',
    avatar_url: 'https://example.com/avatar.jpg',
    sendMail: true,
    activity: 'Desenvolvedor',
    investorProfile: 'Conservador',
    investmentProfile: 'Moderado',
    lifeMoment: 'Jovem',
    liquidity: 'Alta',
    maritalStatus: 'Solteiro',
    desiredIncome: 5000,
    initialPl: 10000,
    ageToRetire: 65,
    currentAge: 30,
    annualProfitability: 12,
    maxMonthlyAports: 1000,
    increaseContribution: 5,
    investPerMonth: 500,
    dependents: 0,
    othersIncome: 0,
    spousesIncome: 0,
    expense: 3000,
    currentInvestments: ['CDB', 'LCI'],
    emergency_reserve: 6000,
    incomeType: 'CLT',
    advisorCode: 'ADV001',
    birthDate: '1994-01-01',
    lastLogin: '2024-01-15',
    subscription_end_date: '2024-12-31',
    active_subscription: true,
    plan_id: 'premium',
    annual_investment: true,
    investment_volume: true,
    profile_volume: true,
    allocated_wallet_FII: true,
    allocated_wallet_RV: true,
    allocated_wallet_RF: true,
    allocated_wallet_fund: true,
    RV_diversification: true,
    filled_wallet: true,
    emergency_reserve_verify: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    home_step_tutorial: true,
    fixed_income_step_tutorial: true,
    investment_funds_step_tutorial: true,
    patrimony_evolution_step_tutorial: true,
    real_state_funds_step_tutorial: true,
    variable_income_step_tutorial: true,
    user_avatar: 'avatar.jpg',
    has_incomes: true,
    b3_monthly_quantity: '1000',
    phone_checked: true,
    hundred_percent_coupon: false,
    origin: 'organic',
    token: 'abc123',
    company: 'Empresa XYZ',
    receives_sms: true,
    alreadyInvesting: true,
    monthlyIncome: '5000',
    nextGoals: ['Casa própria', 'Aposentadoria'],
    advisor: {
      name: 'Consultor ABC',
      phone: '+5511888888888',
      email: 'consultor@email.com',
      avatar_url: 'https://example.com/consultor.jpg',
    },
  })

  describe('Cenários de sucesso', () => {
    it('deve remover propriedades especificadas', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password', 'token']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.token).toBeUndefined()
      expect(result.name).toBe('João Silva')
      expect(result.email).toBe('joao@email.com')
    })

    it('deve remover múltiplas propriedades', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password', 'token', 'advisorCode', 'phone']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.token).toBeUndefined()
      expect(result.advisorCode).toBeUndefined()
      expect(result.phone).toBeUndefined()
      expect(result.name).toBe('João Silva')
    })

    it('deve remover propriedades null', () => {
      // Arrange
      const user: IUser = {
        ...createMockUser(),
        advisorCode: null,
        phone: null,
        currentInvestments: null,
      }
      const propsToRemove = ['password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.advisorCode).toBeUndefined()
      expect(result.phone).toBeUndefined()
      expect(result.currentInvestments).toBeUndefined()
    })

    it('deve manter propriedades não especificadas para remoção', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.name).toBe('João Silva')
      expect(result.email).toBe('joao@email.com')
      expect(result.phone).toBe('+5511999999999')
      expect(result.sendMail).toBe(true)
      expect(result.activity).toBe('Desenvolvedor')
    })

    it('deve não modificar o objeto original', () => {
      // Arrange
      const user = createMockUser()
      const originalUser = { ...user }
      const propsToRemove = ['password', 'token']

      // Act
      omitUserProps(user, propsToRemove)

      // Assert
      expect(user).toEqual(originalUser)
    })
  })

  describe('Cenários de borda', () => {
    it('deve retornar objeto vazio quando todas as propriedades são removidas', () => {
      // Arrange
      const user = createMockUser()
      const allProps = Object.keys(user) as (keyof IUser)[]

      // Act
      const result = omitUserProps(user, allProps)

      // Assert
      expect(result).toEqual({})
    })

    it('deve retornar objeto original quando array de propriedades está vazio', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove: string[] = []

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result).toEqual(user)
    })

    it('deve lidar com propriedades inexistentes', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['propriedadeInexistente', 'password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.name).toBe('João Silva')
    })

    it('deve lidar com usuário com propriedades undefined', () => {
      // Arrange
      const user: IUser = {
        name: 'João',
        email: undefined,
        phone: undefined,
        password: 'senha123',
      }
      const propsToRemove = ['password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.email).toBeUndefined()
      expect(result.phone).toBeUndefined()
      expect(result.name).toBe('João')
    })

    it('deve lidar com usuário vazio', () => {
      // Arrange
      const user: IUser = {}
      const propsToRemove = ['password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result).toEqual({})
    })
  })

  describe('Cenários com diferentes tipos de dados', () => {
    it('deve remover propriedades de diferentes tipos', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password', 'sendMail', 'desiredIncome', 'currentInvestments']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.password).toBeUndefined()
      expect(result.sendMail).toBeUndefined()
      expect(result.desiredIncome).toBeUndefined()
      expect(result.currentInvestments).toBeUndefined()
      expect(result.name).toBe('João Silva')
    })

    it('deve lidar com propriedades aninhadas no advisor', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['advisor']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.advisor).toBeUndefined()
      expect(result.name).toBe('João Silva')
    })

    it('deve manter propriedades aninhadas quando não removidas', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password']

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      expect(result.advisor).toEqual({
        name: 'Consultor ABC',
        phone: '+5511888888888',
        email: 'consultor@email.com',
        avatar_url: 'https://example.com/consultor.jpg',
      })
    })
  })

  describe('Cenários de performance', () => {
    it('deve lidar com muitas propriedades para remoção', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = [
        'password', 'token', 'advisorCode', 'phone', 'email',
        'avatar_url', 'sendMail', 'activity', 'investorProfile',
        'investmentProfile', 'lifeMoment', 'liquidity', 'maritalStatus',
      ]

      // Act
      const result = omitUserProps(user, propsToRemove)

      // Assert
      propsToRemove.forEach(prop => {
        expect(result[prop as keyof IUser]).toBeUndefined()
      })
      expect(result.name).toBe('João Silva')
    })

    it('deve manter referência independente do objeto', () => {
      // Arrange
      const user = createMockUser()
      const propsToRemove = ['password']

      // Act
      const result1 = omitUserProps(user, propsToRemove)
      const result2 = omitUserProps(user, propsToRemove)

      // Assert
      expect(result1).toEqual(result2)
      expect(result1).not.toBe(result2) // Não devem ser a mesma referência
    })
  })
})

