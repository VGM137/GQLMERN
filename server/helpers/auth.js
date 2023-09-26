import { cert, initializeApp }  from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({
  credential: cert(process.env.FIREBASE_CONFIG)
});

export const authCheck = async (req, res, next) => {
  try{
    const currentUser = await getAuth().verifyIdToken(req.headers.authtoken)
    return currentUser
  }catch(error){
    console.log('AUTH CHECK ERROR',error)
    throw new Error('Invalid or expired token', error)
  }
} 

export const authCheckMiddleware = async (req, res, next) => {
  if(req.headers.authtoken){
    try{
      const currentUser = await getAuth().verifyIdToken(req.headers.authtoken)
      
      next()
    }catch(error){
      console.log('AUTH CHECK ERROR',error)
      throw new Error('Invalid or expired token', error)
    }
  }else{
    res.json({ error: 'Unauthorized token'})
  }
}