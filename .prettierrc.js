/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 120,

  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-organize-imports'],

  overrides: [
    {
      files: 'tsconfig.json',
      options: {
        parser: 'jsonc',
      },
    },
  ],
}

export default config
