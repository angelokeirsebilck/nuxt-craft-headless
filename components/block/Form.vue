<script lang="ts" setup>
interface IForm {
  handle: string;
}

interface ITextBlockData {
  __typename: string;
  id: number;
  itemForm: IForm[];
}

interface IProps {
  blockData: ITextBlockData;
}

defineProps<IProps>();
</script>
<template>
  <div class="default-grid">
    <div class="order-2 col-span-full lg:col-span-7 lg:order-1">
      <FormieForm :handle="blockData.itemForm[0].handle" />
    </div>
    <div class="order-1 col-span-full lg:col-span-5 lg:order-2">
      Contact Information
    </div>
  </div>
</template>
