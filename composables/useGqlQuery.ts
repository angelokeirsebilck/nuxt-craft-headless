interface IGraphqlQuery {
  query: string;
  routeQuery?: {
    [key: string]: string | string[];
  };
  variables?: {
    [key: string]: string | string[] | number;
  };
}

interface ICustomHeaders {
  [key: string]: string | string[];
}

interface ITransform {
  data: {
    [key: string]: any;
  };
}

export const useGraphqlQuery = (params: IGraphqlQuery) => {
  const runtimeConfig = useRuntimeConfig();

  const {
    preview,
    token,
    "x-craft-preview": xCraftPreview,
    "x-craft-live-preview": xCraftLivePreview,
  } = params.routeQuery;

  const apiUrl =
    preview && token
      ? `${runtimeConfig.CRAFT_CMS_GRAPHQL_ENDPOINT}?token=${token}`
      : runtimeConfig.CRAFT_CMS_GRAPHQL_ENDPOINT;
  const customHeaders: ICustomHeaders = {};

  // If Live Preview
  if (preview && xCraftLivePreview) {
    customHeaders["x-craft-live-preview"] = xCraftLivePreview;
  }

  // If Preview
  if (preview && xCraftPreview) {
    customHeaders["x-craft-preview"] = xCraftPreview;
  }

  return useFetch(apiUrl, {
    method: "POST",
    body: {
      query: params.query,
      variables: params.variables || null,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${runtimeConfig.CRAFT_CMS_GRAPHQL_TOKEN}`,
      ...customHeaders,
    },
  });
};
