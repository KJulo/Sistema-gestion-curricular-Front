import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@sagas/index";
import authReducer from "../redux/slices/auth/authSlice";

// reducers
import studentReducer from "@slices/students";
import teacherSlice from "@slices/teachers";
import errorReducer from "@slices/error";
import adminSlice from "@slices/admin";
import userSlice from "@slices/user";
import parentSlice from "@slices/parents";
import { apiSlice } from "../api/apiSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    student: studentReducer,
    error: errorReducer,
    admin: adminSlice,
    teacher: teacherSlice,
    parent: parentSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(sagaMiddleware),
  devTools: true
});
sagaMiddleware.run(rootSaga);

export default store;
