import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ["./backend/tsconfig.eslint.json"], // Ruta desde la raíz del repo
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      }

    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    }

  },
);
