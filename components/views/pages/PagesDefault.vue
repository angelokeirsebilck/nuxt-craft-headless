<script lang="ts" setup>
import { pagesDefaultQuery } from "~~/graphql/views/pages/default.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
const route = useRoute();
const {
  params: { uri },
} = route;

const { data } = await useGraphqlQuery({
  query: pagesDefaultQuery,
  variables: {
    siteId: 2,
    uri,
  },
  routeQuery: route.query,
  fetchKey: `${siteStore.locale}/${uri}-pagesDefault`,
});
</script>

<template>
  <div>Component: views/PagesDefault</div>
</template>

<style scoped></style>
