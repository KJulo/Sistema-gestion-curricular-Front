import { createSlice } from '@reduxjs/toolkit';

export const parent = createSlice({
    name: 'parent',
    initialState: {
      parentData: {},
    },
    reducers: {
      fetchParent: () => {},
      updateParent: (state, action) => {
        state.parentData = action.payload;
      }
    }
})

// exportar funciones individuales
export const {
  fetchParent,
  updateParent,
} = parent.actions;

// exportar reducer del slice para mandarlo a la store
export default parent.reducer;