import { defineConfig, globalIgnores } from "eslint/config";
import pluginVue from "eslint-plugin-vue";

const eslintConfig = defineConfig([
  ...globalIgnores(["dist/**", "node_modules/**", ".vscode/**", ".idea/**"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: {
      vue: pluginVue,
    },
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": 0,
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
  },
]);

export default eslintConfig;
