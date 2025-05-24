// eslint.config.cjs
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // override/add rules settings here, such as:
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
