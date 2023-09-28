import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user: null

}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAddress(state, action) {
        state.address = action.payload;
      
      },
      login(state, action) {
        state.user = action.payload.user;

        state.tokenExpirationDate =
          action.payload.expirationDate ||
          new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
        localStorage.setItem(
          "userData",
          JSON.stringify({
            user: state.user,
        
          })
        );
      },
      logout(state) {
        state.token = null;
 
        localStorage.removeItem("userData");
      },
    },
  });
  
  export const authActions = authSlice.actions;
  
  export default authSlice;
