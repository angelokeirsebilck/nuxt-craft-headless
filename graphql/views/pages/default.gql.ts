import { gql } from "graphql-request";
import { contentBuilder } from "~~/graphql/contentbuilder/contentBuilder.gql";

export const pagesDefaultQuery = gql`
  query entry($uri: [String]!, $siteId: [QueryArgument]!) {
    entry(uri: $uri, siteId: $siteId) {
      ... on pages_default_Entry {
        id
        ${contentBuilder}
      }
    }
  }
`;
