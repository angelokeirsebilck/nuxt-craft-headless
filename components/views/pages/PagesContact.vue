<script lang="ts" setup>
import { pagesContactQuery } from "~~/graphql/views/pages/contact.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
const route = useRoute();
const {
  params: { uri },
} = route;

const { data } = await useGraphqlQuery({
  query: pagesContactQuery,
  variables: {
    siteId: siteStore.siteId,
    uri,
  },
  routeQuery: route.query,
  fetchKey: `${siteStore.locale}/${uri}-pagesDefault`,
});

const contentBuilderData = computed(() => {
  return data?.value?.data?.entry?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/PagesContact</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
