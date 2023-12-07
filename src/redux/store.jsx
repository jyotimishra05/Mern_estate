import { configureStore } from '@reduxjs/toolkit'
import userReducer  from "./user/userSlice"

export const store = configureStore({
  reducer: {
    user:userReducer
  },
  //in order to check the serializable check other gives error later
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),  //to prevent any error in your browser
})

