import { gql } from "graphql-request";

export const categoryQuery = gql`
  query category($uri: [String]!, $siteId: [QueryArgument]!) {
    category(uri: $uri, siteId: $siteId) {
      id
      title
      groupHandle
      siteId
      level
      localized {
        siteId
        uri
      }
    }
  }
`;
