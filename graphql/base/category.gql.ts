import { gql } from "graphql-request";

export const categoryQuery = gql`
    category(uri: $uri, siteId: $siteId) {
      id
      title
      groupHandle
      siteId
      level
      localized {
        siteId
        uri
        language
      }
    }
`;
