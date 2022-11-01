import { all } from "redux-saga/effects";
import teacher from './teacher';
import student from './student';
import admin from './admin';
import parent from './parent';


export default function* rootSaga() {
  yield all([
    ...teacher,
    ...student,
    ...admin,
    ...parent,
  ])
}