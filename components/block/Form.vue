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
  <div>
    <FormieForm :handle="blockData.itemForm[0].handle" />
  </div>
</template>
