import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'Content is required',
    text: true
  },
  image: {
    url:{
      type: String,
      default: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=Post',
    },
    public_id:{
      type: String,
      default: Date.now
    }
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
}, {timestamps: true})

export const PostModel = mongoose.model('Post', PostSchema)