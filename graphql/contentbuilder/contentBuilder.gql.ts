import { gql } from "graphql-request";
import { typeText } from "./blocks";

export const contentBuilder = gql`
fieldContentBuilder {
   ${typeText}
  }
`;
