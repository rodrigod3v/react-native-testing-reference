import { formatFontScale } from './formatFontScale'

// Mock do PixelRatio
jest.mock('react-native', () => ({
  PixelRatio: {
    getFontScale: jest.fn(() => 1),
  },
}))

describe('formatFontScale', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formata tamanho de fonte com escala padrão', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(1)

    expect(formatFontScale(16)).toBe('16px')
    expect(formatFontScale(18)).toBe('18px')
    expect(formatFontScale(20)).toBe('20px')
  })

  it('formata tamanho de fonte com escala customizada', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(1.5)

    expect(formatFontScale(16)).toBe('10.666666666666666px')
    expect(formatFontScale(18)).toBe('12px')
    expect(formatFontScale(20)).toBe('13.333333333333334px')
  })

  it('formata tamanho de fonte com escala menor que 1', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(0.8)

    expect(formatFontScale(16)).toBe('20px')
    expect(formatFontScale(18)).toBe('22.5px')
    expect(formatFontScale(20)).toBe('25px')
  })

  it('trata valores decimais', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(1.25)

    expect(formatFontScale(16)).toBe('12.8px')
    expect(formatFontScale(18)).toBe('14.4px')
  })

  it('trata valores zero', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(1)

    expect(formatFontScale(0)).toBe('0px')
  })

  it('trata valores negativos', () => {
    const { PixelRatio } = require('react-native')
    PixelRatio.getFontScale.mockReturnValue(1)

    expect(formatFontScale(-10)).toBe('-10px')
  })
})

