<script lang="ts" setup>
interface IPage {
  id: number;
  name: string | undefined | null;
  rows: Object[];
  settings: Object;
}

interface IProps {
  pageData: IPage;
  formData: IFormData;
  isSubmitting: boolean;
  settings: object;
}

interface IFormData {
  [key: string]: string | number;
}

const props = defineProps<IProps>();

const submitting = computed(() => {
  return props.isSubmitting;
});
</script>

<template>
  <div class="">
    <div
      class="flex w-full gap-4"
      :key="rowIndex"
      v-for="(row, rowIndex) in pageData.rows"
    >
      <FormieField
        :formData="formData"
        :field="field"
        :key="fieldIndex"
        v-for="(field, fieldIndex) in row?.rowFields"
      />
    </div>
    <FormKit
      type="submit"
      :input-class="{
        'pointer-events-none cursor-auto': isSubmitting,
      }"
    >
      <Button
        intent="primary"
        :loadingIndicator="settings.loadingIndicator"
        :loadingIndicatorText="settings.loadingIndicatorText"
        :is-submitting="submitting"
        :label="pageData.settings?.submitButtonLabel"
      />
    </FormKit>
  </div>
</template>
