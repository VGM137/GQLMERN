import gql from "graphql-tag";

export const posts = gql`
  type Post{
    id: ID!
    title: String!
    description: String!
  }
  type Query {
    totalPosts: Int!
    allPosts: [Post!]
  }
  # input type
  input PostInput{
    title: String!
    description: String!
  }
  type Mutation {
    newPost(input: PostInput!): Post!
  }
`

export const auth = gql`
  type Query {
    me: String!
  }
`
