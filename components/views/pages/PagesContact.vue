<script lang="ts" setup>
import { pagesContactQuery } from "~~/graphql/views/pages/contact.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();

const { data } = await useAsyncGql("pagesContact", {
  siteId: siteStore.siteId,
  uri: siteStore.finalUri,
});

const contentBuilderData = computed(() => {
  return data?.value?.entry?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/PagesContact</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
