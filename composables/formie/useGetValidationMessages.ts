interface IField {
  [key: string]: string | number;
}

export const useGetValidationMessages = (field: IField): object => {
  let validationObject = {};

  if (field.required) {
    validationObject = {
      required: field.errorMessage,
      ...validationObject,
    };
  }

  if (field.typeName.replace("Field_", "") == "Email") {
    validationObject = {
      email: "Dit veld moet een email zijn",
      ...validationObject,
    };
  }

  if (field.typeName.replace("Field_", "") == "Agree") {
    validationObject = {
      accepted: field.errorMessage,
      ...validationObject,
    };
  }
  return validationObject;
};
