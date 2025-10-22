import { searchSettingsChartLine } from './searchSettingsChartLine'
import { settingChart, settingDataLabel } from '../constants'

describe('searchSettingsChartLine', () => {
  it('should return the correct JSON string for "chart" property', () => {
    const chartProp = 'chart'
    const result = searchSettingsChartLine(chartProp)
    expect(result).toBe(JSON.stringify(settingChart))
  })

  it('should return the correct JSON string for "dataLabel" property', () => {
    const chartProp = 'dataLabel'
    const result = searchSettingsChartLine(chartProp)
    expect(result).toBe(JSON.stringify(settingDataLabel))
  })
})
