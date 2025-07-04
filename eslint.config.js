import playwright from "eslint-plugin-playwright";

export default [
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      semi: ["error", "always"],
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "brace-style": ["error", "1tbs"],
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["src/tests/**"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
];
