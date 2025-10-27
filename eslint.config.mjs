// // @ts-check
// import eslint from "@eslint/js";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import globals from "globals";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   {
//     ignores: ["eslint.config.mjs"],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: "commonjs",
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//         project: "./tsconfig.json",
//       },
//     },
//   },
//   {
//     rules: {
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/no-floating-promises": "warn",
//       "@typescript-eslint/no-unsafe-argument": "warn",
//     },
//   }
// );
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "no-console": "error",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...tseslint.configs.recommended
);
