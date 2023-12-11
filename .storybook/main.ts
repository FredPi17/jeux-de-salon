import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss"
  ],
  core: {
    builder: "@storybook/builder-vite" // 👈 The builder enabled here.
  },
  viteFinal: (config) => {
    // Add any necessary Vite configuration here
    return config;
  },
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
};
export default config;
