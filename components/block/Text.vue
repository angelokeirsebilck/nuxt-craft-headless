<script lang="ts" setup>
interface ITextBlockData {
  __typename: string;
  id: number;
  itemText: string;
}

interface IProps {
  blockData: ITextBlockData;
}

defineProps<IProps>();
</script>

<template>
  <div class="my-24">
    <div class="prose" v-html="blockData.itemText"></div>
  </div>
</template>
