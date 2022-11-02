import { gql } from "graphql-request";

export const typeText = gql`
... on fieldContentBuilder_typeText_BlockType {
    __typename
    id
    itemText
  }
`;
