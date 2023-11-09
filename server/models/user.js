import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    index: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true
  },
  images: {
    type: Array,
    default:[
      {
        url: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=Profile',
        public_id: Date.now
      }
    ]
  },
  about: {
    type: String
  }
}, {timestamps: true})

export const UserModel = mongoose.model('User', UserSchema)

