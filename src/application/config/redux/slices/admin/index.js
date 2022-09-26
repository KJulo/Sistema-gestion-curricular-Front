import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
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
      courseFiltersUpdate: (state, action) => {
          state.student = action;
      }
    }
})

// exportar funciones individuales
export const { courseFiltersUpdate } = adminSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default adminSlice.reducer;