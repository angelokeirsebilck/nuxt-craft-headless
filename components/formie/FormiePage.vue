<script lang="ts" setup>
interface IPage {
  id: number;
  name: string | undefined | null;
  rows: any;
  settings: any;
}

interface IProps {
  pageData: IPage;
  formData: IFormData;
  isSubmitting: boolean;
  settings: any;
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
      class="flex flex-col w-full mb-6 md:flex-row md:gap-x-4 gap-y-6"
      :key="rowIndex"
      v-for="(row, rowIndex) in pageData.rows"
    >
      <FormieField
        :settings="settings"
        :formData="formData"
        :field="field"
        :key="fieldIndex"
        v-for="(field, fieldIndex) in row?.rowFields"
      />
    </div>
    <FormKit
      type="submit"
      :input-class="{
        'pointer-events-none cursor-auto': isSubmitting
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
