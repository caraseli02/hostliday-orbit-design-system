import js from "@eslint/js";
import solid from "eslint-plugin-solid";

const solidConfig = solid.configs["flat/recommended"];

export default [
  js.configs.recommended,
  ...(Array.isArray(solidConfig) ? solidConfig : [solidConfig]),
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },
  {
    ignores: ["dist/", "node_modules/", "_archive/", ".gstack/", "public/"],
  },
];
