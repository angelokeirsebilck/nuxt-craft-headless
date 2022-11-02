export interface IPageInfo {
  sectionHandle?: string;
  typeHandle?: string;
  groupHandle?: string;
}

import { getCurrentInstance } from "vue";
import { useFirstLetterUppercase } from "~/composables/useFirstLetterUppercase";

export const useResolvePageComponent = (params: IPageInfo) => {
  const instance = getCurrentInstance();
  const sectionHandle = useFirstLetterUppercase({
    text: params?.sectionHandle,
  });
  const typeHandle = useFirstLetterUppercase({
    text: params?.typeHandle,
  });

  const groupHandle = useFirstLetterUppercase({
    text: params?.groupHandle,
  });

  let compToResolve = null;

  if (sectionHandle && typeHandle) {
    compToResolve = `${sectionHandle}${typeHandle}`;
  }

  if (groupHandle) {
    compToResolve = `${groupHandle}`;
  }

  console.log(compToResolve);

  return typeof instance?.appContext.components === "object" &&
    compToResolve in instance.appContext.components
    ? compToResolve
    : "PagesDefault";
};
