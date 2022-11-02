import { gql } from "graphql-request";
import { contentBuilder } from "~~/graphql/contentbuilder/contentBuilder.gql";

export const pagesContactQuery = gql`
  query entry($uri: [String]!, $siteId: [QueryArgument]!) {
    entry(uri: $uri, siteId: $siteId) {
      ... on pages_contact_Entry {
        id
        ${contentBuilder}
      }
    }
  }
`;
