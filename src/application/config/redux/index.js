import { configureStore } from '@reduxjs/toolkit'

// reducers
import studentReducer from '@slices/students'
import teacherSlice from '@slices/teachers'
import errorReducer from '@slices/error'
import adminSlice from '@slices/admin'

export default configureStore({
    reducer: {
        student: studentReducer,
        error: errorReducer,
        admin: adminSlice, 
        teacher: teacherSlice,
    }
})