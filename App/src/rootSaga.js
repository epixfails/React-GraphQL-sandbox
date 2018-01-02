import { all, fork } from 'redux-saga/effects';
import { addUserSaga } from './components/InputForm';
import { getUsersSaga } from './components/UsersList';

export default function* rootSaga() {
  yield all([getUsersSaga, addUserSaga].map(saga => fork(saga)));
}
