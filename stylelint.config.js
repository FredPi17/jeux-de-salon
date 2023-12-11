// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    "stylelint-scss"
  ],
  extends: ["stylelint-config-standard"],
  // https://stylelint.io/user-guide/configuration
  rules: {
    "no-empty-source": null,
    "at-rule-no-unknown": null,
    "declaration-colon-newline-after": null,
    "no-descending-specificity": null,
    "keyframe-declaration-no-important": null,
    "declaration-block-single-line-max-declarations": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ]
  }
};
