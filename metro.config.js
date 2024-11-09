const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resolver: {
    blacklistRE: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ]),
  },
  watchFolders: [
    // 프로젝트의 감시 폴더를 명시적으로 지정하여 범위를 제한
    './src',
  ],
  maxWorkers: 2, // CPU 코어 수에 따라 적절히 조정
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
