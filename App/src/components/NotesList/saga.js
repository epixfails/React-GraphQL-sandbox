import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GOT_NOTES,
  GET_NOTES,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_ERROR,
  NOTE_DELETE,
  NOTE_UPDATE,
} from '~/ducks';

const userQuery = 'query { notes { id, title, content, date_updated } }';

export const getNotes = () =>
  axios
    .get(`https://damp-earth-31682.herokuapp.com/api?query=${userQuery}`, {
      headers: {
        'Content-Type': 'application/graphql',
      },
    })
    .then(response => response.data.data.notes);

export const deleteNoteRequest = id => {
  const query = `mutation { delete(id: "${id}") { title, content } }`;
  axios.post('https://damp-earth-31682.herokuapp.com/api', {
    query,
  });
};

export const updateNoteRequest = note => {
  const query = `mutation { update(id: "${note.id}", title: "${note.title}", content: "${note.content}") { id, title, content } }`;
  axios.post('https://damp-earth-31682.herokuapp.com/api', { query });
};

function* getNotesArray() {
  try {
    const notes = yield call(getNotes);
    yield put({ type: GOT_NOTES, notes });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, message: e.message });
  }
}

function* updateNoteById(action) {
  try {
    yield call(updateNoteRequest, action.note);
    yield put({ type: NOTE_UPDATE_SUCCESS });
  } catch (e) {
    yield put({ type: NOTE_UPDATE_ERROR, message: e.message });
  }
}

function* deleteNoteById(action) {
  try {
    const note = yield call(deleteNoteRequest, action.id);
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
