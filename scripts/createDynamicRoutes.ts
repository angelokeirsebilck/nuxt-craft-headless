import { configSites } from "../config/sites";

export const dynamicRoutes = async () => {
  const finalRoutes: string[] = [""];

  const data = await fetch(process.env.NUXT_CRAFT_CMS_GRAPHQL_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query: `query prerenderQuery {
        categories(siteId:[1,2]) {
          uri
          siteId
        }
        entries(section: ["home", "pages"], siteId: [1,2]) {
          uri
          siteId
        }
      }`,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NUXT_CRAFT_CMS_GRAPHQL_TOKEN}`,
    },
  });

  const {
    data: { categories, entries },
  } = await data.json();

  entries.forEach((entry) => {
    let { siteId, uri } = entry;

    const matchingSite = configSites.find((site) => site.siteId === siteId);
    const locale =
      matchingSite.urlParameter.length > 0
        ? `/${matchingSite.urlParameter}/`
        : "/";

    finalRoutes.push(`${locale}${uri.replace("__home__", "")}`);
  });

  categories.forEach((category) => {
    let { siteId, uri } = category;

    const matchingSite = configSites.find((site) => site.siteId === siteId);
    const locale =
      matchingSite.urlParameter.length > 0
        ? `/${matchingSite.urlParameter}/`
        : "/";

    finalRoutes.push(`${locale}${uri.replace("__home__", "")}`);
  });

  return finalRoutes;
};
