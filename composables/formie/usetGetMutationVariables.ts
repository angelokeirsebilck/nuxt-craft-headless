import { isPlainObject } from "lodash-es";
import { useGetFormFieldMeta } from "@/composables/formie/usetGetFormFieldMeta";

interface IFormData {
  [key: string]: string | number | any;
}

export const usetGetMutationVariables = (form: any, object: IFormData) => {
  console.log(form);
  let returnObject: any[] = [];
  // Get the mutation types to ensure we cast everything properly
  const mutationTypes = useGetFormFieldMeta(form);

  mutationTypes.forEach((info) => {
    let value = object[info.handle];
    console.log(info.inputTypeName);
    if (typeof value === "undefined") {
      return;
    }

    // Fix up any objects that look like arrays
    if (isPlainObject(value)) {
      if (typeof value[0] !== "undefined") {
        value = Object.values(value);
      }
    }

    if (info.inputTypeName === "Int") {
      value = parseInt(object[info.handle], 10);
    }

    if (info.inputTypeName === "[Int]") {
      if (isPlainObject(value)) {
        value = Object.values(value);
      }

      value = value.map((item: any) => {
        return parseInt(item, 10);
      });
    }

    if (info.inputTypeName === "Number") {
      value = Number(object[info.handle]);
    }

    if (info.inputTypeName === "[Number]") {
      if (isPlainObject(value)) {
        value = Object.values(value);
      }

      value = value.map((item: any) => {
        return Number(item);
      });
    }

    if (info.inputTypeName === "String") {
      value = object[info.handle].toString();
    }

    returnObject[info.handle] = value;
  });

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha: any) => {
    returnObject[captcha.handle] = {
      name: captcha.name,
      value: captcha.value,
    };
  });

  return returnObject;
};
