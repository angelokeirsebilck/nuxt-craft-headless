import { getNode } from "@formkit/core";

interface IField {
  [key: string]: string | number;
}

export const usetGetDefaultValue = (field: IField) => {
  if (!field.defaultValue) return null;

  switch (field.typeName.replace("Field_", "")) {
    case "SingleLineText":
      return field.defaultValue;
    case "Email":
      return field.defaultValue;
    case "Agree":
      return true;
  }
};
