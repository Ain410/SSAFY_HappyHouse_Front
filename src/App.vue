<template>
  <div class="container">
    <div id="app">
      <header-comp></header-comp>
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "App",
  components: {
    HeaderComp,
  },
};
</script>

<style></style>
