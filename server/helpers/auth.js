import { cert, initializeApp }  from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({
  credential: cert(process.env.FIREBASE_CONFIG)
});

export const authCheck = async (req, res, next) => {
  console.log(req.headers)
  console.log(req.headers.authtoken)
  try{
    const currentUser = await getAuth().verifyIdToken(req.headers.authtoken)
    console.log('CURRENT USER', currentUser)
    return currentUser
  }catch(error){
    console.log('AUTH CHECK ERROR',error)
    throw new Error('Invalid or expired token', error)
  }
} 

/* let authorize = true;

export const authCheck = (req, res, next = (f) => f) => {
  if(!req.headers.authtoken) throw new Error('Unauthorize')
  const valid = req.headers.authtoken === 'secret'

  if(!valid){
    throw new Error('Unauthorize')
  }else{
    next()
  }

}
 */

/* var admin = require("firebase-admin");
var serviceAccount = require("../config/gqlmern137-firebase-adminsdk-9lg9b-9d8a2b4a17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports.authCheck = async (req, res, next) => {
  try{
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    console.log('CURRENT USER', currentUser)
    return currentUser
  }catch(error){
    console.log('AUTH CHECK ERROR',error)
    throw new Error('Invalid or expired token', error)
  }

} 
*/