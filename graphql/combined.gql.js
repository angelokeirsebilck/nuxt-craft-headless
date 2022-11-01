import { gql } from "graphql-request";

export const combinedQuery = gql`
  query combined($uri: [String]!, $siteId: [QueryArgument]!) {
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
    globalSet(handle: "globalNav", siteId: $siteId) {
      ... on globalNav_GlobalSet {
        id
        name
        fieldMainNav {
          ... on fieldMainNav_BlockType {
            itemLink {
              customText
              type
              text
              target
              element {
                uri
                siteId
              }
            }
          }
        }
      }
    }
  }
`;
