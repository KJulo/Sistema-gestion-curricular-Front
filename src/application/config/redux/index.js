import { configureStore } from '@reduxjs/toolkit'

// reducers
import studentReducer from '@slices/students'
import errorReducer from '@slices/error'

export default configureStore({
    reducer: {
        student: studentReducer,
        error: errorReducer,
    }
})