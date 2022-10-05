require('dotenv').config({ path: '../../.env' })
const withTM = require('next-transpile-modules')(['shared-constants', 'ui'])

module.exports = withTM({
  reactStrictMode: true,
})
