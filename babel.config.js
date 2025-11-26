module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // keep this first
    ['module:react-native-dotenv', {
      moduleName: '@env',      // import variables like: import { API_BASE } from '@env';
      path: '.env',            // path to your .env file
      safe: false,             // set true if you want .env.example check
      allowUndefined: true,    // allow variables not defined in .env
    }]
  ],
};
