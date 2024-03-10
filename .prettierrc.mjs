/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 120,

  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-organize-imports'],
}

export default config
