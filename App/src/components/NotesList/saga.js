import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GOT_NOTES,
  GET_NOTES,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_ERROR,
  NOTE_DELETE,
  NOTE_UPDATE,
} from '@/notes';

const apiRequest = (query, callback) =>
  axios
    .post('http://localhost:8080/api', {
      query,
    })
    .then(data => {
      if (callback) return callback(data);
      return data;
    });

function* getNotesArray() {
  try {
    const notes = yield call(
      apiRequest,
      'query { notes { id, title, content, date_updated, category } }',
      response => response.data.data.notes,
    );
    yield put({ type: GOT_NOTES, notes });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, message: e.message });
  }
}

function* updateNoteById(action) {
  const { note } = action;
  try {
    yield call(
      apiRequest,
      `mutation { update(id: "${note.id}", title: "${note.title}", content: "${note.content}", category: "${note.category}") { id } }`,
    );
    yield put({ type: NOTE_UPDATE_SUCCESS });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, message: e.message });
  }
}

function* deleteNoteById(action) {
  const { id } = action;
  try {
    const note = yield call(
      apiRequest,
      `mutation { delete(id: "${id}") { title, content } }`,
    );
    yield put({ type: NOTE_UPDATE_SUCCESS, note });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, message: e.message });
  }
}

function* getNotesSaga() {
  yield takeLatest(GET_NOTES, getNotesArray);
  yield takeLatest(NOTE_DELETE, deleteNoteById);
  yield takeLatest(NOTE_UPDATE, updateNoteById);
}

export default getNotesSaga;
