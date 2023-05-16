let authorize = true;

export const authCheck = (req, res, next = f => f) => {
  console.log(req)
  if(!req.headers.authtoken) throw new Error('Unauthorize')
  const valid = req.headers['authtoken'] === 'secret'

  if(!valid){
    throw new Error('Unauthorize')
  }else{
    next()
  }

}