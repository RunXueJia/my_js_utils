<template>
  <div class="about">
    <h1>关于</h1>
    <div>{{ aboutName }}</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const aboutName = ref("nihao");
</script>
