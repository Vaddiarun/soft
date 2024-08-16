import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import menuSlicer from "./reducer/menuSlice.js";
import userSlice from './reducer/userSlice.js';
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    cart: menuSlicer,
    user: userSlice,
})

const persistConfig = {
  key: "root",
  storage,
  version:1,
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor=persistStore(store)