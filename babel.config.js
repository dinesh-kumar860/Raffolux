// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ['react-native-reanimated/plugin'],
//   ],
  
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      // plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true, // for safe mode, it's highly recommended to set allowUndefined to false
      "verbose": false,
    }],
    'react-native-reanimated/plugin',
  ]
};
//  plugins: [ ],
