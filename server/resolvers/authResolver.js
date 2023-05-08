import gql from "graphql-tag";

const me = () => 'Victor'
export const authResolver = {
  Query: {
    me
  }
};
