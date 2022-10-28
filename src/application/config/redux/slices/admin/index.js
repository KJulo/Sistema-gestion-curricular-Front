import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      admin: {},
      courses: {
        filters: {
          courses: [
            'Primero',
            'Segundo',
            'Tercero',
            'Cuarto ',
            'Quinto ',
            'Sexto',
            'Septimo',
            'Octavo ',
          ],
          subjects: ['Matematicas', 'Fisica', 'Quimica', 'Biologia']
        }
      }
    },
    reducers: {
      fetchAdmin: () => {},
      updateAdmin: (state, action) => {
          state.admin = { ...state.admin, ...action.payload };
      },
      courseFiltersUpdate: (state, action) => {
          state.student = action;
      }
    }
})

// exportar funciones individuales
export const { courseFiltersUpdate, fetchAdmin, updateAdmin } = adminSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default adminSlice.reducer;