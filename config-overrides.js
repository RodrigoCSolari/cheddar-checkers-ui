const {
  addBabelPreset,
  override,
  addExternalBabelPlugin,
} = require('customize-cra')

module.exports = override(
  addBabelPreset('@babel/preset-env'),
  addExternalBabelPlugin([
    '@babel/plugin-proposal-optional-chaining',
    { loose: false },
  ]),
  addExternalBabelPlugin([
    '@babel/plugin-proposal-nullish-coalescing-operator',
    { loose: false },
  ]),
  function (webpackConfig) {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@ledgerhq/devices/hid-framing': '@ledgerhq/devices/lib/hid-framing',
    }
    return webpackConfig
  }
)
