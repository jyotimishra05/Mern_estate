// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import userReducer  from "./user/userSlice"
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// const rootReducer= combineReducers({user:userReducer}) ; //add reducers we have ex ; user

// const persistConfig={
//     key:'root',
//     storage,
//     version:1
// }
// const persistedReducer = persistReducer(persistConfig ,rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
// //   {
// //     // user:userReducer

// //   },
//   //in order to check the serializable check other gives error later
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),  //to prevent any error in your browser
// })
//  export const persistor = persistStore(store);

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);