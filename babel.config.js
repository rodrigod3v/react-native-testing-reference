module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@commons': './src/commons',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@services': './src/services',
            '@modules': './src/modules',
            '@theme': './src/theme',
            '@lib': './src/lib',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          allowUndefined: false,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
