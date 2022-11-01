import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
      userData: {},
    },
    reducers: {
      fetchUser: () => {},
      updateUser: (state, action) => {
        state.userData = action.payload ?? {};
      },
      resetUser: () => {
        state.userData = {}
      }
    }
})

// exportar funciones individuales
export const {
  fetchUser,
  updateUser,
} = user.actions;

// exportar reducer del slice para mandarlo a la store
export default user.reducer;