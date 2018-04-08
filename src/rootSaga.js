import { all, fork } from 'redux-saga/effects';
import { addNoteSaga } from './components/NoteAdd';
import { getNotesSaga } from './components/NotesList';

export default function* rootSaga() {
  yield all([getNotesSaga, addNoteSaga].map(saga => fork(saga)));
}
