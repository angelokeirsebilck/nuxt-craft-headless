import { configSites } from "~/config/sites";

export const useGetCurrentSiteDataFromId = (id: number) => {
  return configSites.find((site) => site.siteId === id);
};
