import { gql } from "graphql-request";
import { entryQuery } from "@/graphql/base/entry.gql";
import { categoryQuery } from "@/graphql/base/category.gql";
import { mainNavQuery } from "@/graphql/nav/mainnav.gql";

export const uriQuery = gql`
  query uriData($uri: [String]!, $siteId: [QueryArgument]!) {
    ${entryQuery}
    ${categoryQuery}
    ${mainNavQuery}
  }
`;
