import type { Meta, StoryObj } from "@storybook/vue3";

import LottieAnimation from "./LottieAnimation.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof LottieAnimation> = {
  title: "LottieAnimation",
  component: LottieAnimation,
  tags: ["autodocs"],
  argTypes: {
    animation: { control: "select", options: ["errorPage"] },
  },
  args: {
    animation: "errorPage",
    width: "400px",
    height: "400px",
    loop: true,
    autoplay: true,
  },
};

export default meta;
type Story = StoryObj<typeof LottieAnimation>;

export const ErrorPage: Story = {
  args: {
    animation: "errorPage",
  },
};
