import React, { useReducer, createContext, useEffect } from "react";
import { getAuth } from "firebase/auth";

/* Reducer */
const firebaseReducer = (state, action) => {
  switch(action.type){
    case  "LOGGED_IN_USER":
      return {...state, user: action.payload}
    default:
      return state;
  }
}

/* State */
const initialState = {
  user: null
}

/* Create context */
const AuthContext = createContext()

/* Context provider */
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      let value = {
        type: 'LOGGED_IN_USER',
        payload: null
      }
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        value.payload = { emal: user.email, token: idTokenResult.token }
        dispatch(value)
      }else{
        dispatch(value)
      }
    })

    return () => unsubscribe();
  }, [])

  const value = { state, dispatch }
  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}

/* Export */
export { AuthContext, AuthProvider }