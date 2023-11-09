import gql from "graphql-tag";
import { posts } from "../temp.js";
import { authCheck } from "../helpers/auth.js";
import { DateTimeResolver } from "graphql-scalars";
import { UserModel } from "../models/user.js";
import { PostModel } from "../models/post.js";

const postCreate = async (parent, args, {req}) => {
  const currentUser = await authCheck(req);

  if(args.input.content.trim() === '') throw new Error('Content is require')

  const currentUserFromDB = await UserModel.findOne({
    email: currentUser.email
  })
  let newPost = await new PostModel({
    ...args.input,
    postedBy: currentUserFromDB._id
  }).save()
    .then(post => post.populate('postedBy'));

  return newPost
};

const allPosts = async (parent, args) => {
  const currentPage = args.page || 1;
  const perPage = 3

  return await PostModel.find({})
    .skip((currentPage - 1) * perPage)
    .populate('postedBy', 'username _id')
    .limit(perPage)
    .sort({ createdAt: -1 })
    .exec();
};

const postByUser = async (paren, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await UserModel.findOne({
    email: currentUser.email
  }).exec();

  return await PostModel.find({postedBy: currentUserFromDB})
    .populate('postedBy', '_id username')
    .sort({createdAt: -1});
}

const singlePost = async (parent, args) => {
  console.log(args)
  return await PostModel.findById({_id: args.postId})
    .populate('postedBy', '_id username')
    .exec()
}

const postUpdate = async (parent, args, {req}) => {
  if(args.input.content.trim() === '') throw new Error('Content is required')
  
  const currentUser = await authCheck(req);
  const currentUserFromDB = await UserModel.findOne({email: currentUser.email}).exec();
  const postToUpdate = await PostModel.findById({_id: args.input._id}).exec()

  if(currentUserFromDB.id.toString() !== postToUpdate.postedBy._id.toString()) throw new Error ('Unauthorized')

  let updatedPost = await PostModel.findByIdAndUpdate(args.input._id, {...args.input}, {new: true})
    .exec()
    .then(post => post.populate('postedBy', '_id username'));
  return updatedPost
}

const postDelete = async (parent, args, {req}) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await UserModel.findOne({email: currentUser.email}).exec();
  const postToDelete = await PostModel.findById({_id: args.postId}).exec()

  if(currentUserFromDB.id.toString() !== postToDelete.postedBy._id.toString()) throw new Error ('Unauthorized')

  let deletedPost = await PostModel.findByIdAndDelete({_id: args.postId}).exec();
  return deletedPost;
}

const totalPosts = async (paernt, args) => await PostModel.find({}).estimatedDocumentCount().exec()

const search = async (parent, {query}) => {
  return await PostModel.find({$text: {$search: query}})
  .populate('postedBy', 'username')
  .exec()
}

export const postsResolver = {
  Query: {
    allPosts,
    postByUser,
    singlePost,
    totalPosts,
    search
  },
  Mutation: {
    postCreate,
    postUpdate,
    postDelete
  }
};
