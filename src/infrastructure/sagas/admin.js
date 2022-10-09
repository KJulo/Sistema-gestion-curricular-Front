import { call, put, takeLatest } from 'redux-saga/effects';

// Reducers
import { fetchAdmin, updateAdmin } from '@slices/admin';
import { updateUser } from '@slices/user';

// Network
import { administrador } from '@network/index';

function* getAdmin() {
  try {
    const response = yield call(administrador.getAdmins);
    const adminList = response.data.data;
    const userData = adminList[0]
    yield put(updateAdmin(userData));
    yield put(updateUser(userData));
  } catch(e) {
    console.log(e);
  }
}

function* watchGetAdminUser() {
  yield takeLatest(fetchAdmin, getAdmin);
}

export default [
  watchGetAdminUser(),
]