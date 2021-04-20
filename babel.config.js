module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
        },
      ],

      [
        'module-resolver',
        {
          root: './src',
          alias: {
            components: './src/components',
            screens: './src/screens',
            assets: './src/assets',
            resolver: './src/resolver',
          },
        },
      ],
    ],
  };
};
