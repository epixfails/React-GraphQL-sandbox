import { combineReducers } from 'redux';
import { notesReducer } from './components/Notes/ducks';
import { editorReducer } from './components/Editor';
import { filterReducer } from './components/NotesList';

export const rootReducer = combineReducers({
  notes: notesReducer,
  filter: filterReducer,
  editor: editorReducer,
});
