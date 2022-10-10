import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const studentSlice = createSlice({
    name: 'students',
    initialState: {
        student: {
          asistencia: [
            { fecha: "8 de agosto", asiste: true },
            { fecha: "9 de agosto", asiste: true },
            { fecha: "10 de agosto", asiste: false },
            { fecha: "11 de agosto", asiste: true }
          ]
        }
    },
    reducers: {
        fetchStudent: () => {},
        updateStudent: (state, action) => {
            state.student = { ...state.student, ...action.payload };
        }
    }
})

// exportar funciones individuales
export const { fetchStudent, updateStudent } = studentSlice.actions;


// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;