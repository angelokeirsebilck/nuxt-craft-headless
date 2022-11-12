<script setup lang="ts">
import { toPlainObject } from "lodash-es";
import { load } from "recaptcha-v3";
import { setErrors, clearErrors, reset } from "@formkit/vue";
interface IProps {
  handle: string;
}

interface IFormData {
  [key: string]: string | number;
}
const config = useRuntimeConfig();
const props = defineProps<IProps>();
const { data } = await useAsyncGql("formQuery", { handle: props.handle });

const form = ref(data?.value?.form);
const formData = ref({});
const formState = reactive({
  submitted: false,
  showErrors: false,
  isSubmitting: false,
});

// Add element if it does not yet exist
function upsert(array: [], element: object) {
  const i = array.findIndex((el) => {
    return el.handle === element.handle;
  });

  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }
}

const submitHandler = async (formData: IFormData) => {
  formState.isSubmitting = true;
  const recaptcha = await load(config.public.RECAPTCHA_SITE_KEY);
  const token = await recaptcha.execute();

  // Only add recpatchaToken if it does not yet exist
  upsert(form.value.captchas, {
    handle: "recaptchaCaptcha",
    name: "g-recaptcha-response",
    value: token,
  });

  const formMutation = useGetFormMutation(data?.value?.form);
  const formVariables = usetGetMutationVariables(data?.value?.form, formData);

  try {
    const result = await $fetch(config.CRAFT_CMS_GRAPHQL_ENDPOINT, {
      method: "POST",
      body: {
        query: formMutation,
        variables: toPlainObject(formVariables),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.CRAFT_CMS_GRAPHQL_TOKEN}`,
      },
    });
    formState.submitted = true;
    formState.showErrors = false;
    formState.isSubmitting = false;
    reset(`form${data?.value?.form?.id}`);

    console.log(result);
  } catch (error) {
    formState.isSubmitting = false;
    console.log(error);
  }
};

const invalidHandler = () => {
  formState.showErrors = true;
};

const settings = computed(() => {
  return form?.value?.settings;
});

const errorMessageTop = computed(() => {
  if (settings.value?.errorMessagePosition == "bottom-form") return false;
  return true;
});

const successMessageTop = computed(() => {
  if (settings.value?.submitActionMessagePosition == "bottom-form")
    return false;
  return true;
});
</script>

<template>
  <div>
    <Alert
      :auto-close="false"
      intent="danger"
      v-if="formState.showErrors && errorMessageTop"
      >{{ settings?.errorMessageHtml }}</Alert
    >
    <Alert
      intent="success"
      :auto-close="settings?.submitActionMessageTimeout"
      v-if="
        formState.submitted &&
        successMessageTop &&
        settings?.submitAction == 'message'
      "
      >test
    </Alert>
    <FormKit
      type="form"
      :id="`form${data?.form?.id}`"
      :form-class="
        formState.submitted && settings?.submitActionFormHide
          ? 'hidden'
          : 'block'
      "
      submit-label="Register"
      @submit-invalid="invalidHandler"
      @submit="submitHandler"
      :actions="false"
      v-model="formData"
      :incomplete-message="false"
    >
      <FormiePage
        :isSubmitting="formState.isSubmitting"
        :settings="settings"
        :formData="formData"
        :pageData="page"
        :key="pageIndex"
        v-for="(page, pageIndex) in data?.form?.pages"
      />
    </FormKit>
    <Alert
      :auto-close="false"
      intent="danger"
      v-if="formState.showErrors && !errorMessageTop"
      >{{ settings?.errorMessageHtml }}</Alert
    >
    <Alert
      intent="success"
      :auto-close="settings?.submitActionMessageTimeout"
      v-if="
        formState.submitted &&
        !successMessageTop &&
        settings?.submitAction == 'message'
      "
      >test
    </Alert>
  </div>
</template>
