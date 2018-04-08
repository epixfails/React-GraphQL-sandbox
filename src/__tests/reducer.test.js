import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { SET_NOTE_EDITOR, editor, changeNote, setEditor } from '~/ducks/editor';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const mockStore = configureStore(middlewares);

describe('Editor reducer', () => {
  it('should have initial state', () => {
    expect(
      editor(undefined, {
        type: SET_NOTE_EDITOR,
        note: { title: 'note' },
      }),
    ).toEqual({});
  });

  it('editor dispatch', () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(setEditor({ title: 'new note' }));
    store.dispatch(changeNote({ content: 'note' }));
    const actions = store.getActions();
    const expectedPayload = [
      {
        note: { title: 'new note' },
        type: 'SET_NOTE_EDITOR',
      },
      {
        note: { content: 'note' },
        type: 'CHANGE_NOTE_EDITOR',
      },
    ];
    expect(actions).toEqual(expectedPayload);
  });
});
