import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {  configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./store/cartSlice.js";
import compareReducer from "./store/compareSlice.js";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
// const persistConfig = {
//   key: "cart",
//   storage,
//   version: 1,
// };

// const rootPersistConfig = {
//   key: "root",
//   storage: storage,
// };

// const rootReducer = combineReducers({
//   compare: compareReducer.reducer,
// });

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = configureStore({
  reducer: {
    cart: cartReducer.reducer,
    compare: compareReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
