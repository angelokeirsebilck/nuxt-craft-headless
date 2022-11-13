<script lang="ts" setup>
interface IProps {
  field: IField;
  formData: IFormData;
}
interface IField {
  [key: string]: string | number;
}

interface IFormData {
  [key: string]: string | number;
}

const props = defineProps<IProps>();

const showField = computed(() => {
  return useGetConditionalValue(props.field, props.formData);
});

const labelValue = computed(() => {
  if (props.field.labelPosition !== "verbb\\formie\\positions\\Hidden")
    return props.field.label;
  return false;
});
</script>

<template>
  <component
    v-if="showField && field.visibility !== 'hidden'"
    :fieldData="field"
    :is="`${field.typeName.replace('Field_', '')}`"
    :label="labelValue"
    :id="field.handle"
    :name="field.handle"
    :validation="useGetValidationValue(field)"
    :validation-messages="useGetValidationMessages(field)"
    :value="usetGetDefaultValue(field)"
    :placeholder="field.placeholder"
  ></component>
</template>
