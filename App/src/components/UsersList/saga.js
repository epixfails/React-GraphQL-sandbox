import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GOT_USERS,
  GET_USERS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_DELETE,
  USER_UPDATE,
} from '~/ducks';

const userQuery = 'query { users { id, name, address } }';

export const getUsers = () =>
  axios
    .get(`https://damp-earth-31682.herokuapp.com/api?query=${userQuery}`, {
      headers: {
        'Content-Type': 'application/graphql',
      },
    })
    .then(response => response.data.data.users);

export const deleteUserRequest = id => {
  const query = `mutation { delete(id: "${id}") { name, address } }`;
  axios.post('https://damp-earth-31682.herokuapp.com/api', {
    query,
  });
};

export const updateUserRequest = user => {
  const query = `mutation { update(id: "${user.id}", name: "${user.name}", address: "${user.address}") { id, name } }`;
  axios.post('https://damp-earth-31682.herokuapp.com/api', { query });
};

function* getUsersArray() {
  try {
    const users = yield call(getUsers);
    yield put({ type: GOT_USERS, users });
  } catch (e) {
    yield put({ type: USER_UPDATE_ERROR, message: e.message });
  }
}

function* updateUserById(action) {
  try {
    yield call(updateUserRequest, action.user);
    yield put({ type: USER_UPDATE_SUCCESS });
  } catch (e) {
    yield put({ type: USER_UPDATE_ERROR, message: e.message });
  }
}

function* deleteUserById(action) {
  try {
    const user = yield call(deleteUserRequest, action.id);
    yield put({ type: USER_UPDATE_SUCCESS, user });
  } catch (e) {
    yield put({ type: USER_UPDATE_ERROR, message: e.message });
  }
}

function* getUsersSaga() {
  yield takeLatest(GET_USERS, getUsersArray);
  yield takeLatest(USER_DELETE, deleteUserById);
  yield takeLatest(USER_UPDATE, updateUserById);
}

export default getUsersSaga;
