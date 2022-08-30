import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const studentSlice = createSlice({
    name: 'students',
    initialState: {
        list: []
    },
    reducers: {
        setStudentList: (state, action) => {
            state.list = action.payload;
        }
    }
})

// exportar funciones individuales
export const { setStudentList } = studentSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default studentSlice.reducer;