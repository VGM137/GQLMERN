import gql from "graphql-tag";
import { posts } from "../temp.js";
import { authCheck } from "../helpers/auth.js";
import { DateTimeResolver } from "graphql-scalars";

//queires
const totalPosts = () => posts.length;
const allPosts = async (parent, args, {req}) => {
  await authCheck(req);
  return posts
};
//mutations (parent, args, context)
const newPost = (parent, args, context) => {
  console.log(args)
  const { title, description } = args.input
  const post = {
    id: posts.length+1,
    title,
    description
    //...args.input works the same to deconstruct the object of the arguments from the input query
  }
  posts.push(post);
  return post
}
export const postsResolver = {
  Query: {
    totalPosts,
    allPosts
  },
  Mutation: {
    newPost
  }
};
