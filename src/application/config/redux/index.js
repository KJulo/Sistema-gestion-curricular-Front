import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from "@sagas/index";

// reducers
import studentReducer from '@slices/students'
import teacherSlice from '@slices/teachers'
import errorReducer from '@slices/error'
import adminSlice from '@slices/admin'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        student: studentReducer,
        error: errorReducer,
        admin: adminSlice, 
        teacher: teacherSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;