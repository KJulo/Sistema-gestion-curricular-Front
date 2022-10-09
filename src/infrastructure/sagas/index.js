import { all } from "redux-saga/effects";
import teacher from './teacher';


export default function* rootSaga() {
  yield all([
    ...teacher,
  ])
}