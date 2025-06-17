import eslint from "eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  ignores: ["dist/**", "node_modules/**"],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parser: tsParser,
    parserOptions: {
      project: ["./tsconfig.eslint.json"],
      tsconfigRootDir: __dirname,
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    "prettier": eslintPluginPrettierRecommended,
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "log"] }],
    ...tsPlugin.configs["recommended"].rules,
    ...eslintPluginPrettierRecommended.rules,
  },
};
