import { gql } from "@apollo/client";

export const GET_POLICIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;
