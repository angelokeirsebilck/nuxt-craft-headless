<script lang="ts">
// export default {
//   inheritAttrs: false
// };
//
</script>
<script lang="ts" setup>
// import { useAttrs } from "vue";

// const attrs = useAttrs();
interface IProps {
  fieldData: any;
}

const props = defineProps<IProps>();

const inputValue = ref(null);
const inputRef = ref(null);

const multiple = computed(() => {
  if (props.fieldData.limitFiles > 1) return true;

  return false;
});

const acceptValue = computed(() => {
  let acceptValue: string = "";
  props.fieldData.allowedKinds.forEach((kind: string) => {
    switch (kind) {
      case "image":
        acceptValue += ",image/*";
        break;
      case "audio":
        acceptValue += ",audio/*";
        break;
      case "video":
        acceptValue += ",video/*";
        break;
      case "pdf":
        acceptValue += ",.pdf";
        break;
      case "powerpoint":
        acceptValue += ",.ppt, .pptx, application/vnd.ms-powerpoint";
        break;
      case "text":
        acceptValue += ",text/plain";
        break;
      case "word":
        acceptValue += ",.doc,.docx, application/msword";
        break;
      case "javascript":
        acceptValue += ",.js, .ts";
        break;
      case "json":
        acceptValue += ",.json";
        break;
      case "compressed":
        acceptValue +=
          ",.zip, .rar,application/zip,application/x-zip,application/x-zip-compressed,. 7zip";
        break;
      case "excel":
        acceptValue += ",.xls, .xlsx, application/vnd.ms-excel";
        break;
      case "captionsSubtitles":
        acceptValue += ",.srt, .scc, .vtt, .xml, .dfxp, .ITT, .smi, .txt, .sbv";
    }
  });

  return acceptValue;
});

// const attributes = computed(() => {
//   return {
//     ...attrs,
//     accept: acceptValue
//   };
// });

const inputChanged = () => {
  inputValue.value = inputRef?.value?.node?.value;
  //   console.log(inputRef?.value?.node?.value.length);
};

const showNoFiles = computed(() => {
  return inputValue?.value.length == 0;
});
</script>

<template>
  <FormKit
    @input="inputChanged"
    ref="inputRef"
    v-model="inputValue"
    type="file"
    :multiple="multiple"
    :accept="acceptValue"
  >
    <template #prefixIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 mr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </template>
    <template #noFiles>
      <div
        class="text-gray-400 pointer-events-none formkit-no-files"
        v-if="showNoFiles"
      >
        Geen bestand gekozen
      </div>
    </template>
    <template #fileRemoveIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 transition-colors duration-300 group-hover:stroke-error-default"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </template>
  </FormKit>
</template>
