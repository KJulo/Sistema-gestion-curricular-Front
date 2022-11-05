import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => { 
      const { token, ...user } = action.payload.data;
      state.user = user
      state.token = token;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    }

  }
});

export const {
  setCredentials,
  logOut
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;