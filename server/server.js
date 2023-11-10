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
import {v2 as cloudinary} from 'cloudinary';
import { authCheckMiddleware } from "./helpers/auth.js";

const types = [posts, auth]
const allResolvers = [postsResolver, authResolver]

const typeDefs = mergeTypeDefs(types)
const resolvers = mergeResolvers(allResolvers)

const app = express();
const httpServer = http.createServer(app);

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

const corsOptions = {
  origin: ['https://clientsidegqlmern.onrender.com'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '5mb' }))


app.get('/rest', authCheck, function(req, res){
  res.json({
    data: 'You hit rest endpoint'
  })
})

app.post('/uploadimages', authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image, 
  ).then((result) => {
    res.send({
      url: result.secure_url,
      public_id: result.public_id
    });
  },
  {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  }).catch(error => console.log(error))
});

app.post('/removeimages', authCheckMiddleware, (req, res) => {
  let imageId = req.body.public_id

  cloudinary.uploader.destroy(imageId, (error, result) => {
    if(error) return res.json({ success: false, error})

    res.send('ok')
  })
});

app.use(
  '/graphql',
  cors(),
  bodyParser.json({ limit: '5mb' }),
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