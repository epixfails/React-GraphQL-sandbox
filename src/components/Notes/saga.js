import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GOT_NOTES,
  GET_NOTES,
  NOTE_ADD,
  NOTE_UPDATE_SUCCESS,
  NOTE_ADD_SUCCESS,
  NOTE_UPDATE_ERROR,
  NOTE_DELETE,
  NOTE_UPDATE,
} from './ducks';

const apiRequest = (query, callback) =>
  axios
    .post('https://damp-earth-31682.herokuapp.com/api', {
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
      `mutation { update(id: "${note.id}", title: "${note.title}", content: "${
        note.content
      }", category: "${note.category}") { id } }`,
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

export const addNoteRequest = note => {
  const query = `mutation { add(title: "${note.title}", content: "${
    note.content
  }", category: "${
    note.category
  }") { id, title, content, category, date_updated } }`;
  return axios
    .post('https://damp-earth-31682.herokuapp.com/api', {
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

function* getNotesSaga() {
  yield takeLatest(GET_NOTES, getNotesArray);
  yield takeLatest(NOTE_DELETE, deleteNoteById);
  yield takeLatest(NOTE_UPDATE, updateNoteById);
  yield takeLatest(NOTE_ADD, addNote);
}

export default getNotesSaga;
