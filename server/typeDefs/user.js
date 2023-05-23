import gql from "graphql-tag";

export const user = gql`
  type UserCreateRespone {
    username: String!
    email: String!
  }
  type Mutation {
    userCreate: UserCreateRespone!
  }
`