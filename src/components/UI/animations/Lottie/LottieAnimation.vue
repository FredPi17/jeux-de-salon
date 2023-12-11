<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import { ref, onMounted, watch } from "vue";
import lottieAnimations from "@/assets/lotties/";

interface Props {
  animation?: string;
  width: string;
  height: string;
  loop: boolean;
  autoplay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  animation: "",
  width: "400",
  height: "400",
  loop: false,
  autoplay: false
});

const animationData = ref<any>(null);

function loadAnimation() {
  try {
    const animationFile = lottieAnimations[props.animation];

    if (animationFile) {
      animationData.value = animationFile;
    } else {
      throw new Error("Lottie file not found");
    }
  } catch (err) {
    console.error("Failed to load animation", err);
  }
}

watch(
  () => props.animation, () => {
    loadAnimation();
  }
);
onMounted(() => {
  loadAnimation();
});
</script>

<template>
  <div>
    <Vue3Lottie
      :animationData="animationData"
      :autoplay="autoplay"
      :height="height"
      :loop="loop"
      :width="width"
    />
  </div>
</template>

<style lang="scss" scoped></style>
