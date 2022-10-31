<script lang="ts" setup>
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
</script>

<template>
  <div class="flex space-x-8">
    <NavItem
      :key="index"
      :item="item"
      v-for="(item, index) in siteStore.navMain"
    />
  </div>
</template>

<style scoped></style>
