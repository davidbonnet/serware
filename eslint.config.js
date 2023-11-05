import jsConfig from "@eslint/js";
import parser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import infernoPlugin from "eslint-plugin-inferno";
import reactPlugin from "eslint-plugin-react";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import vitestPlugin from "eslint-plugin-vitest";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["dist/**/*", "node_modules/**/*"],
    plugins: {
      import: importPlugin,
      inferno: infernoPlugin,
      tailwindcss: tailwindcssPlugin,
      react: reactPlugin,
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
    },
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
      globals: {},
    },
    rules: {
      ...jsConfig.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...tailwindcssPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "off",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-custom-classname": "off",
      "inferno/jsx-props-class-name": ["error", "class"],
      "arrow-body-style": ["error", "as-needed"],
      camelcase: [
        "error",
        {
          allow: ["^UNSAFE_"],
          properties: "always",
        },
      ],
      curly: "error",
      "default-case": "error",
      eqeqeq: [
        "error",
        "always",
        {
          null: "never",
        },
      ],
      "func-names": ["error", "always"],
      "id-length": [
        "error",
        {
          min: 3,
          properties: "never",
          exceptions: [
            "a",
            "b",
            "x",
            "y",
            "i",
            "j",
            "_",
            "io",
            "id",
            "fs",
            "to",
          ],
        },
      ],
      "import/extensions": ["error", "always", { ignorePackages: true }],
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],
      "jest/no-deprecated-functions": "off",
      "line-comment-position": [
        "error",
        {
          position: "above",
        },
      ],
      "no-sequences": "error",
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: true,
          skipTemplates: true,
        },
      ],
      "no-param-reassign": "error",
      "no-unused-vars": "off",
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
      "no-var": "error",
      "no-redeclare": "off",
      "object-shorthand": ["error", "properties"],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
      "prefer-const": "error",
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
      "react/jsx-key": "off",
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          children: "ignore",
          props: "never",
        },
      ],
      "spaced-comment": [
        "error",
        "always",
        {
          line: {
            markers: ["/"],
          },
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
  },
];
