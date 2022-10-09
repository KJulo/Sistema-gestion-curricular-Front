import { call, put, takeLatest } from 'redux-saga/effects';

// Reducers
import { fetchParent, updateParent } from '@slices/parents';
import { updateUser } from '@slices/user';

// Network
import { apoderado } from '@network/index';

function* getParent() {
  try {
    const response = yield call(apoderado.getParents);
    const parentList = response.data.data;
    const userData = parentList[0]
    yield put(updateParent(userData));
    yield put(updateUser(userData));
  } catch(e) {
    console.log(e);
  }
}

function* watchGetParentUser() {
  yield takeLatest(fetchParent, getParent);
}

export default [
  watchGetParentUser(),
]