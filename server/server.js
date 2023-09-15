import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import http from 'http'
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config.js";
import mongoose from "mongoose";
import { authCheck } from "./helpers/auth.js";
import { posts} from "./typeDefs/post.js";
import { auth } from "./typeDefs/auth.js";
/* import { user } from "./typeDefs/user.js"; */
import { postsResolver } from "./resolvers/postResolver.js";
import { authResolver } from "./resolvers/authResolver.js";

const types = [posts, auth]
const allResolvers = [postsResolver, authResolver]

const typeDefs = mergeTypeDefs(types)
const resolvers = mergeResolvers(allResolvers)

const app = express();
const httpServer = http.createServer(app);

const db = async () => {
  try{
    const success = await mongoose.connect(process.env.DATABASE_CLOUD);
    console.log('DB conncted')
  }catch(error){
    console.log('DB connection error', error)
  }
};
db();

//grapql sever
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  
});
await apolloServer.start()


app.get('/rest', authCheck, function(req, res){
  res.json({
    data: 'You hit rest endpoint'
  })
})
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: ({req, res}) => ({req, res})
  }),
);



/* await new Promise((resolve) => httpServer.listen({ port: process.env.PORT}, resolve));
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
console.log(apolloServer.graphqlPath) */
app.listen(process.env.PORT, function(){
  console.log(`Server is ready at http://localhost:${process.env.PORT}`)
  console.log(`Graphql server is ready at http://localhost:${process.env.PORT}`)
})