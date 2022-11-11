<script setup lang="ts">
import { toPlainObject } from "lodash-es";

interface IProps {
  handle: string;
}

const props = defineProps<IProps>();
const { data } = await useAsyncGql("formQuery", { handle: props.handle });

const submitted = ref(false);
const formData = ref({});

const submitHandler = async () => {
  const formMutation = useGetFormMutation(data?.value?.form);
  const formVariables = usetGetMutationVariables(
    data?.value?.form,
    formData.value
  );
  console.log(formVariables);
  const result = await $fetch("http://craft-headless-nuxt.ddev.site/api", {
    method: "POST",
    body: {
      query: formMutation,
      variables: toPlainObject(formVariables),
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW`,
    },
  });

  console.log(result);
};
</script>

<template>
  <div class="flex flex-col">
    <FormKit
      type="form"
      :id="`form${data?.form?.id}`"
      :form-class="submitted ? 'hidden' : 'block'"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
      v-model="formData"
      :incomplete-message="data?.form?.settings?.errorMessageHtml"
    >
      <FormiePage
        :formData="formData"
        :pageData="page"
        :key="pageIndex"
        v-for="(page, pageIndex) in data?.form?.pages"
      />

      <FormKit type="submit" label="Register" />
    </FormKit>

    <div v-if="submitted">
      <h2>{{ data?.form?.settings?.submitActionMessageHtml }}</h2>
    </div>
  </div>
</template>
