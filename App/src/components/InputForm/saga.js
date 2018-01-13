import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { NOTE_ADD, NOTE_ADD_SUCCESS, NOTE_UPDATE_ERROR } from '@/notes';

export const addNoteRequest = note => {
  const query = `mutation { add(title: "${note.title}", content: "${note.content}", category: "${note.category}") { id, title, content, category, date_updated } }`;
  return axios
    .post('http://localhost:8080/api', {
      query,
    })
    .then(response => response.data.data.add);
};

function* addNote(action) {
  try {
    const note = yield call(addNoteRequest, action.payload);
    yield put({ type: NOTE_ADD_SUCCESS, note });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, payload: e.message });
  }
}

export default function* addNoteSaga() {
  yield takeLatest(NOTE_ADD, addNote);
}
