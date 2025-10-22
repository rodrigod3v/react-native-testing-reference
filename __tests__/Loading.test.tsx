import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Loading } from './index'

// Mock do tema
const mockTheme = {
  colors: {
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

describe('Loading', () => {
  it('renderiza ActivityIndicator com tamanho fornecido', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="large" />
    )

    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })

  it('renderiza com tema padrão (light)', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="small" />
    )

    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })

  it('renderiza com tema customizado (dark)', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="large" theme="dark" />
    )

    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })

  it('renderiza com tamanho small', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="small" />
    )

    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })

  it('renderiza com tamanho large', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="large" />
    )

    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })
})

