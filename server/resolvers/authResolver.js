import gql from "graphql-tag";
import { authCheck } from "../helpers/auth.js";
import { UserModel } from "../models/user.js"
import shortId from "shortid"

const me = async (parent, args, {req, res}) => {
  await authCheck(req, res);
  return 'Victor'
}
const userCreate = async (parent, args, {req, res}) => {
  const currentUser = await authCheck(req)
  const user = await UserModel.findOne({email: currentUser.email})
  return user ? user : new UserModel({
    email: currentUser.email,
    username: shortId.generate()
  }).save()
}

export const authResolver = {
  Query: {
    me
  },
  Mutation: {
    userCreate
  }
};
