<script lang="ts" setup>
interface IPage {
  id: number;
  name: string | undefined | null;
  rows: Object[];
  settings: Object;
}

interface IProps {
  pageData: IPage;
  formData: object;
}

defineProps<IProps>();
</script>

<template>
  <div>
    <div class="flex" :key="rowIndex" v-for="(row, rowIndex) in pageData.rows">
      <FormieField
        :formData="formData"
        :field="field"
        :key="fieldIndex"
        v-for="(field, fieldIndex) in row"
      />
    </div>
  </div>
</template>
