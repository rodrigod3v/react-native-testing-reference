import { formatDataToChartFunds } from './formatDataToChartReits'

describe('formatDataToChartFunds', () => {
  it('mapeia fundClassGraph para itens do gráfico e filtra valores não positivos', () => {
    const data = {
      fundClassGraph: {
        Renda: 50,
        Crescimento: 0,
        indefinido: 10,
      },
      incomesGraph: {
        'Indefinido': 5,
      },
    }

    const result = formatDataToChartFunds(data)

    // Deve incluir Renda (50), Indefinido (10) e adicionar Não Cadastrado (5)
    expect(result.map((i) => i.label)).toEqual(
      expect.arrayContaining(['Renda', 'Indefinido', 'Não Cadastrado'])
    )

    // Não deve incluir valores zero (Crescimento: 0)
    expect(result.find((i) => i.label === 'Crescimento')).toBeUndefined()

    // Todos os valores devem ser > 0
    expect(result.every((i) => i.value > 0)).toBe(true)
  })

  it('retorna array vazio quando fundClassGraph não existe', () => {
    expect(formatDataToChartFunds({})).toEqual([])
  })
})


