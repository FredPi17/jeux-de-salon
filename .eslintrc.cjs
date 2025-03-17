/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  plugins: ["storybook"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/no-setup-props-destructure": "off",
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    "vue/component-api-style": [
      "error",
      ["script-setup"], // "script-setup", "composition", "composition-vue2", or "options"
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    "vue/component-options-name-casing": ["error", "PascalCase"],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineProps", "defineEmits"],
      },
    ],
    "vue/define-props-declaration": ["error", "type-based"],
    "vue/no-multiple-objects-in-class": "error",
    "vue/no-static-inline-styles": "error",
    "vue/no-undef-components": [
      "error",
      {
        ignorePatterns: [],
      },
    ],
  },
};
