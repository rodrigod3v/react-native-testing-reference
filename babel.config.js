module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'], // ou ['module:metro-react-native-babel-preset'] para RN puro
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
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
          },
        },
      ],
    ],
  };
};
