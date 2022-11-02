import { gql } from "graphql-request";

export const entryQuery = gql`
    entry(uri: $uri, siteId: $siteId) {
      id
      title
      typeHandle
      sectionHandle
      siteId
      localized {
        siteId
        uri
        language
      }
    }
`;
