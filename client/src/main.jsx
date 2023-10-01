import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./store/cartSlice.js";
import compareReducer from "./store/compareSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/Http/index.js";

const store = configureStore({
  reducer: {
    cart: cartReducer.reducer,
    compare: compareReducer.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [],
      },
    }),
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
