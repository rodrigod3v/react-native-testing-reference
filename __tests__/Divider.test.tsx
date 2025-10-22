import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Divider } from './index'

// Mock do tema
const mockTheme = {
  colors: {
    gray460: '#999999',
    white100: '#ffffff',
  },
  font: {
    regular: 'System',
  },
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>)
}

describe('Divider', () => {
  it('renderiza corretamente com tema padrão', () => {
    const { getByTestId } = renderWithTheme(<Divider testID="divider" />)

    const divider = getByTestId('divider')
    expect(divider).toBeTruthy()
  })

  it('renderiza com tema customizado', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" themeApp="light" />
    )

    const divider = getByTestId('divider')
    expect(divider).toBeTruthy()
  })

  it('aceita props adicionais do View', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" style={{ height: 10 }} />
    )

    const divider = getByTestId('divider')
    expect(divider).toBeTruthy()
  })
})
