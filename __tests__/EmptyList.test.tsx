import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { Text } from 'react-native'

import { EmptyList } from './index'

// Mock do tema
const mockTheme = {
  colors: {
    gray460: '#999999',
    white100: '#ffffff',
    black100: '#000000',
  },
  font: {
    regular: 'System',
  },
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>)
}

describe('EmptyList', () => {
  it('renderiza o texto fornecido', () => {
    const { getByText } = renderWithTheme(
      <EmptyList text="Nenhum item encontrado" />
    )

    expect(getByText('Nenhum item encontrado')).toBeTruthy()
  })

  it('renderiza com tema padrão (dark)', () => {
    const { getByText } = renderWithTheme(<EmptyList text="Lista vazia" />)

    expect(getByText('Lista vazia')).toBeTruthy()
  })

  it('renderiza com tema customizado', () => {
    const { getByText } = renderWithTheme(
      <EmptyList text="Lista vazia" theme="light" />
    )

    expect(getByText('Lista vazia')).toBeTruthy()
  })

  it('renderiza children quando fornecidos', () => {
    const { getByText } = renderWithTheme(
      <EmptyList text="Lista vazia">
        <Text>Conteúdo adicional</Text>
      </EmptyList>
    )

    expect(getByText('Lista vazia')).toBeTruthy()
    expect(getByText('Conteúdo adicional')).toBeTruthy()
  })

  it('aceita props adicionais do View', () => {
    const { getByTestId } = renderWithTheme(
      <EmptyList text="Lista vazia" testID="empty-list" />
    )

    expect(getByTestId('empty-list')).toBeTruthy()
  })

  it('renderiza sem children quando não fornecidos', () => {
    const { queryByText } = renderWithTheme(<EmptyList text="Lista vazia" />)

    expect(queryByText('Lista vazia')).toBeTruthy()
    expect(queryByText('Conteúdo adicional')).toBeFalsy()
  })
})
