export interface IPageInfo {
  sectionHandle?: string;
  typeHandle?: string;
  groupHandle?: string;
}

import { getCurrentInstance } from "vue";

export const useResolvePageComponent = (params: IPageInfo) => {
  const instance = getCurrentInstance();
  const sectionHandle = useFirstLetterUppercase({
    text: params?.sectionHandle
  });
  const typeHandle = useFirstLetterUppercase({
    text: params?.typeHandle
  });

  const groupHandle = useFirstLetterUppercase({
    text: params?.groupHandle
  });

  let compToResolve = null;

  if (sectionHandle && typeHandle) {
    compToResolve = `${sectionHandle}${typeHandle}`;
  }
  if (sectionHandle == typeHandle) {
    compToResolve = `${sectionHandle}`;
  }

  if (groupHandle) {
    compToResolve = `${groupHandle}`;
  }

  if (
    typeof instance?.appContext.components === "object" &&
    compToResolve in instance.appContext.components
  )
    return compToResolve;

  throw createError({
    message: "No view found for this section/type or group",
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    fatal: true,
    statusCode: 500
  });
};
