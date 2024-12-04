import userReducer from "../redux/user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchSlice from "../redux/search/searchSlice";
import saveListingSlice from "../redux/saveListing/saveListingSlice";
import notificationSlice from "../redux/notifications/notificationSlice";

//===== Redux Persist's Code ======//
const rootReducer = combineReducers({
  user: userReducer,
  search: searchSlice,
  notification: notificationSlice,
  savedListing: saveListingSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "savedListing", "search"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//===== Redux Store ======//
const store = configureStore({
  reducer: persistedReducer,

  //==== Middleware for serializable check =====//
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

// Default export for store
export default store;
