import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import babelParser from "@babel/eslint-parser";
import prettier from "eslint-plugin-prettier/recommended";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["dist", "node_modules", ".astro/**"],
  },

  js.configs.recommended,

  // Astro
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      astro,
    },
    rules: {
      "astro/no-unused-css-selector": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "prettier/prettier": "error",
    },
  },

  // TypeScript con tipo (usa el parser adecuado)
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // JavaScript/JSX y archivos .mjs (ESModules)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "React|Paper|Table|TableBody|TableCell|TableContainer|TableHead|TablePagination|TableRow|Modify|Plus|Rest",
          argsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },

  prettier,
];
