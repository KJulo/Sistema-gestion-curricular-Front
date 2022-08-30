import { configureStore } from '@reduxjs/toolkit'

// reducer
import studentReducer from '@slices/students'

export default configureStore({
    reducer: {
        student: studentReducer,
    }
})