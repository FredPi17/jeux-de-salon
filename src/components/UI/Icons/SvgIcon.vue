<script lang="ts" setup>
defineProps<{
  name: string
  color?: string
  size?: string
}>();
</script>

<template>
  <svg aria-hidden="true">
    <use :color="color" :height="size" :href="`#icon-${name}`" :width="size" />
  </svg>
</template>
