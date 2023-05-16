import gql from "graphql-tag";
import { authCheck } from "../helpers/auth.js";

const me = (parent, args, {req, res}) => {
  authCheck(req, res)
  return 'Victor'
}

export const authResolver = {
  Query: {
    me
  }
};
