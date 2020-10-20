module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
    expect: true
  },
  extends: [
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'operator-linebreak': ['error', 'before']
  }
}
