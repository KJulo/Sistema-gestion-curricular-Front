import { createSlice } from '@reduxjs/toolkit';

// Constants
import { courses } from '@constants/teacher/virtualClass.js';
import { courseNames } from '@constants/teacher/coursesNames';
import { students } from '@constants/teacher/students';
import { studentsMarks } from '@constants/teacher/studentsMarks';

export const user = createSlice({
    name: 'user',
    initialState: {
      userData: {},
    },
    reducers: {
      fetchUser: () => {},
      updateUser: (state, action) => {
        state.userData = action.payload;
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