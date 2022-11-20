<script lang="ts" setup>
interface IImage {
  url: string;
}

interface ITextBlockData {
  __typename: string;
  id: number;
  itemText: string;
  itemImage: [IImage];
}

interface IProps {
  blockData: ITextBlockData;
}

defineProps<IProps>();
</script>

<template>
  <div class="my-24">
    <div class="default-grid">
      <div class="col-span-6 col-span-full">
        <div>
          <nuxt-picture
            loading="lazy"
            :src="blockData.itemImage[0].url"
            sizes="sm:100vw md:50vw"
          />
        </div>
      </div>
      <div class="col-span-6 col-span-full">
        <div class="prose" v-html="blockData.itemText"></div>
      </div>
    </div>
  </div>
</template>
