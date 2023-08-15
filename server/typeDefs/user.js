import gql from "graphql-tag";

export const user = gql`
  type UserCreateResponse {
    username: String!
    email: String!
  }
  type Mutation {
    userCreate: UserCreateResponse!
  }
`