import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        error: '',
        code: 0,
    },
    reducers: {
        errorClear: (state, action) => {
            state.error = '';
            state.code = 0;
        },
        errorFetch: (state, action) => {
          state.error = action.payload.error;
          state.code = action.payload.code;
        }
    }
})

// exportar funciones individuales
export const { errorClear, errorFetch } = errorSlice.actions;

// exportar reducer del slice para mandarlo a la store
export default errorSlice.reducer;