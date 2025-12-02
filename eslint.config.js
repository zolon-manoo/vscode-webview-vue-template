import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import parser from "vue-eslint-parser";
import vuePlugin from "eslint-plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
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