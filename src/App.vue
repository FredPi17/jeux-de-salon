<template>
  <header id="header">
    <NavBar></NavBar>
  </header>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import  NavBar  from "@/modules/home/routes/NavBar.vue";
</script>

<style lang="scss" scoped>

#header {
  // for demo
  display: flex;
  justify-content: center;
  padding: 16px;
}

#app-content {
  width: 100%;
  height: 100%;
}
</style>
