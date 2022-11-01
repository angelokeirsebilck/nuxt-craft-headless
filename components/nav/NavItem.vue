<script lang="ts" setup>
import type { ILink } from "~/stores/useSiteStore";

import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();

const props = defineProps<{
  item: ILink;
}>();

const label = computed(() => {
  if (props.item.customText !== null) return props.item.customText;
  return props.item.text;
});
</script>

<template>
  <NuxtLink prefetch :to="`/${siteStore.locale}/${item.element.uri}`">
    {{ label }}
  </NuxtLink>
</template>

<style scoped></style>
