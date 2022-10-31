import { gql } from "graphql-request";

export const entryQuery = gql`
  query entry($uri: [String]!, $siteId: [QueryArgument]!) {
    entry(uri: $uri, siteId: $siteId) {
      id
      title
      typeHandle
      sectionHandle
      siteId
      localized {
        siteId
        uri
      }
    }
  }
`;
