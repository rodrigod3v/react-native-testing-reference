import { render } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

import { OpenFinanceCategories } from './index'
import { CardCategory } from '@modules/Home/components/elements/cards'
import { calculateCategoryProgress } from '@modules/Budget/utils/helpers'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

jest.mock('@modules/Home/components/elements/cards', () => ({
  CardCategory: jest.fn(() => null),
}))

jest.mock('@modules/Budget/utils/helpers', () => ({
  calculateCategoryProgress: jest.fn(),
}))

describe('OpenFinanceCategories', () => {
  const mockNavigate = jest.fn()
  const categoriesMock = [
    { id: '1', name: 'Food', value: 100, planningValue: 150 },
    { id: '2', name: 'Transport', value: 200, planningValue: 150 },
  ]

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate })
    (calculateCategoryProgress as jest.Mock).mockImplementation(
      (planningValue: number, value: number) => value / planningValue,
    )
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  it('não renderiza nada quando ofConnected é false', () => {
    const { toJSON } = render(
      <OpenFinanceCategories categories={categoriesMock} ofConnected={false} />,
    )
    expect(toJSON()).toBeNull()
  })

  it('renderiza corretamente a lista de categorias quando ofConnected é true', () => {
    render(
      <OpenFinanceCategories categories={categoriesMock} ofConnected={true} />,
    )
    expect(CardCategory).toHaveBeenCalledTimes(categoriesMock.length)
  })

  it('ordena categorias corretamente usando calculateCategoryProgress', () => {
    render(
      <OpenFinanceCategories categories={categoriesMock} ofConnected={true} />,
    )
    expect(calculateCategoryProgress).toHaveBeenCalled()
  })

  it('chama navigate ao clicar em uma categoria', () => {
    render(
      <OpenFinanceCategories categories={categoriesMock} ofConnected={true} />,
    )

    const firstCardProps = (CardCategory as jest.Mock).mock.calls[0][0]
    firstCardProps.onPress(categoriesMock[0])

    expect(mockNavigate).toHaveBeenCalledTimes(1)

    jest.runAllTimers()
    expect(mockNavigate).toHaveBeenCalledTimes(2)
  })
})
