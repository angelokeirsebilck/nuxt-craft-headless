<script lang="ts" setup>
import { defaultClasses } from "../../formkit.config";

interface IProps {
  field: IField;
  formData: IFormData;
  settings: any;
}
interface IField {
  [key: string]: string | number | any;
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

const instructionsAboveInput = computed(() => {
  const [defaultFormInstructionsPosition] =
    props.settings.defaultInstructionsPosition.split("\\").slice(-1);
  if (props.field.instructionsPosition == null)
    return defaultFormInstructionsPosition;

  const [fieldInstructionPosition] = props.field.instructionsPosition
    .split("\\")
    .slice(-1);

  return fieldInstructionPosition;
});
</script>

<template>
  <div>
    <div
      :class="defaultClasses.defaultInputs.help"
      v-if="
        instructionsAboveInput == 'AboveInput' && field.instructions !== null
      "
    >
      {{ field.instructions }}
    </div>
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
      :help="
        instructionsAboveInput == 'BelowInput' && field.instructions !== null
          ? field.instructions
          : null
      "
    ></component>
  </div>
</template>
