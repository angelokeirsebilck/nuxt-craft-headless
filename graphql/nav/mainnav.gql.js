import { gql } from "graphql-request";

export const mainNavQuery = gql`
  query mainNavigation($siteId: [QueryArgument]!) {
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
