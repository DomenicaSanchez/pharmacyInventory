import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

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
    "prettier": prettierPlugin,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "log"] }],
  },
};
