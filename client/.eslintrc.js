module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/html-indent': [1, 4],
    'indent': [1, 4],
    'semicolon': 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/require-default-prop': 0,
    eqeqeq: 0,
    curly: 0,
  }
}
