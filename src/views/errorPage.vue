<script lang="ts" setup>
import LottieAnimation from "@/components/UI/animations/Lottie/LottieAnimation.vue";
</script>

<template>
  <div class="flex-column justify-center align-items-center">
    <h1 class="font-color-default a-title font-size-32">
      {{ $t("errors.pageNotFound") }}
    </h1>
    <LottieAnimation :loop="true" animation="errorPage" height="800px" width="800px" />
  </div>
</template>

<style lang="scss" scoped></style>
