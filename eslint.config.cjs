const js = require("@eslint/js");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const parser = require("vue-eslint-parser");
const vuePlugin = require("eslint-plugin-vue");
const path = require("node:path");
const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
  {
    ignores: ["**/dist", "**/*.d.ts"]
  },
  js.configs.recommended,
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      vue: vuePlugin,
    },

    languageOptions: {
      globals: {
        vscode: "writable",
      },

      parser: parser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        parser: {
          ts: "@typescript-eslint/parser",
        },
      },
    },

    rules: {
      "vue/multi-word-component-names": "off",
      "vue/v-on-event-hyphenation": "off",

      "@typescript-eslint/quotes": ["error", "single", {
        allowTemplateLiterals: true,
      }],

      "object-curly-spacing": ["error", "always"],
      semi: ["error", "never"],
      indent: ["error", "tab"],
    },
  }
];