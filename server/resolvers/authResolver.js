import gql from "graphql-tag";
import { authCheck } from "../helpers/auth.js";
import { UserModel } from "../models/user.js"
import shortId from "shortid"
import { DateTimeResolver } from "graphql-scalars";

const profile = async (parent, args, {req, res}) => {
  const currentUser = await authCheck(req, res);
  return await UserModel.findOne({email: currentUser.email}).exec()
}

const publicProfile = async (parent, args, { req }) => {
  return await UserModel.findOne({ username: args.username }).exec()
}

const allUsers = async (parent, args) => await UserModel.find({}).exec()

const userCreate = async (parent, args, {req, res}) => {
  const currentUser = await authCheck(req)
  console.log('userCreate', currentUser)
  const user = await UserModel.findOne({email: currentUser.email})
  return user ? user : new UserModel({
    email: currentUser.email,
    username: shortId.generate()
  }).save()
}

const userUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req)
  const updateUser = await UserModel.findOneAndUpdate(
      {email: currentUser.email}, 
      {...args.input}, 
      {new: true}
  ).exec()

  return updateUser
}

export const authResolver = {
  Query: {
    profile,
    publicProfile,
    allUsers
  },
  Mutation: {
    userCreate,
    userUpdate
  }
};
