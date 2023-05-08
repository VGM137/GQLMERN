import gql from "graphql-tag";

export const auth = gql`
  type Query {
    me: String!
  }
`