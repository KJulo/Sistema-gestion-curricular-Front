import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const studentSlice = createSlice({
    name: 'students',
    initialState: {
        student: {
                id: "12412c1923m1928dj20d29",
                id_colegio: "29183080jf102k9dk",
                tipo: 'estudiante',
                nombres: "Marcelo Jose",
                apellidos: "Rojas Tapia",
                rut: "20539858-5",
                contraseña: "hola123",
								asistencia: [
									{ fecha: "8 de agosto", asiste: true },
									{ fecha: "9 de agosto", asiste: true },
									{ fecha: "10 de agosto", asiste: false },
									{ fecha: "11 de agosto", asiste: true }
								]
							}
    },
    reducers: {
        setStudentList: (state, action) => {
            state.student = action;
        }
    }
})

// exportar funciones individuales
export const { setStudentList } = studentSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;