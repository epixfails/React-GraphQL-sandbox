import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { USER_ADD, USER_ADD_SUCCESS, USER_UPDATE_ERROR } from '../../ducks';

export const addUserRequest = user => {
  const query = `mutation { add(name: "${user.name}", address: "${user.address}") { id, name, address } }`;
  return axios
    .post('https://damp-earth-31682.herokuapp.com/api', {
      query,
    })
    .then(response => response.data.data.add);
};

function* addUser(action) {
  try {
    const user = yield call(addUserRequest, action.payload);
    yield put({ type: USER_ADD_SUCCESS, user });
  } catch (e) {
    yield put({ type: USER_UPDATE_ERROR, payload: e.message });
  }
}

export default function* addUserSaga() {
  yield takeLatest(USER_ADD, addUser);
}
