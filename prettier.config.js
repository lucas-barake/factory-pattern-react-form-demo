/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 120,
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  bracketSpacing: true,
  endOfLine: "lf",
};

export default config;
