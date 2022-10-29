<script lang="ts" setup>
const { data } = await useAsyncGql("home");
</script>

<template>
  <div class="container">
    <div class="" v-for="item in data.entries">{{ item }}</div>
  </div>
</template>
