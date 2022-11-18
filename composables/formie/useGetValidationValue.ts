interface IField {
  [key: string]: string | number;
}

export const useGetValidationValue = (field: IField): string => {
  let validationString = "";

  if (field.required) validationString += "required";

  if (field.typeName.replace("Field_", "") == "Email")
    validationString += "|email";

  // if (field.typeName.replace("Field_", "") == "Phone")
  //   validationString +=
  //     "|matches:/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/";

  if (field.typeName.replace("Field_", "") == "Agree" && field.required) {
    validationString += "|accepted";
    validationString.replace("required", "");
  }

  return validationString;
};
