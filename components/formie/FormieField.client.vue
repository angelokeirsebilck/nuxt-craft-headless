<script lang="ts" setup>
interface IProps {
  field: [IField];
  formData: IFormData;
}
interface IField {
  [key: string]: string | number;
}

interface IFormData {
  [key: string]: string | number;
}

const props = defineProps<IProps>();

const field = computed(() => {
  return props.field[0];
});

const showField = computed(() => {
  return useGetConditionalValue(props.field[0], props.formData);
});
</script>

<template>
  <div>
    <component
      v-if="showField"
      :fieldData="field"
      :is="`${field.typeName.replace('Field_', '')}`"
      :label="field.label"
      :id="field.handle"
      :name="field.handle"
      :validation="useGetValidationValue(field)"
      :validation-messages="useGetValidationMessages(field)"
    ></component>
  </div>
</template>
