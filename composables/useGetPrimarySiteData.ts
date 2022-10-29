import { configSites } from "~/config/sites";

export const useGetPrimarySiteData = () => {
  return configSites.find((site) => site.primary == true);
};
