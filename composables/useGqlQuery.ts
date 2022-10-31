interface IGraphqlQuery {
  key: string;
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
  const { CRAFT_CMS_GRAPHQL_ENDPOINT, CRAFT_CMS_GRAPHQL_TOKEN } =
    useRuntimeConfig();

  const {
    preview,
    token,
    "x-craft-preview": xCraftPreview,
    "x-craft-live-preview": xCraftLivePreview,
  } = params.routeQuery;

  const apiUrl =
    preview && token
      ? `${CRAFT_CMS_GRAPHQL_ENDPOINT}?token=${token}`
      : CRAFT_CMS_GRAPHQL_ENDPOINT;
  const customHeaders: ICustomHeaders = {};

  // If Live Preview
  if (preview && xCraftLivePreview) {
    customHeaders["x-craft-live-preview"] = xCraftLivePreview;
  }

  // If Preview
  if (preview && xCraftPreview) {
    customHeaders["x-craft-preview"] = xCraftPreview;
  }
  console.log(apiUrl);

  // return $fetch(apiUrl, {
  //   method: "POST",
  //   body: {
  //     query: params.query,
  //     variables: params.variables || null,
  //   },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${CRAFT_CMS_GRAPHQL_TOKEN}`,
  //     ...customHeaders,
  //   },
  // });

  return useFetch(apiUrl, {
    key: params.key,
    method: "POST",
    body: {
      query: params.query,
      variables: params.variables || null,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CRAFT_CMS_GRAPHQL_TOKEN}`,
      ...customHeaders,
    },
  });

  // return useAsyncData(`${token}`, () =>
  //   $fetch(apiUrl, {
  //     method: "POST",
  //     body: {
  //       query: params.query,
  //       variables: params.variables || null,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${CRAFT_CMS_GRAPHQL_TOKEN}`,
  //       ...customHeaders,
  //     },
  //   })
  // );
};
