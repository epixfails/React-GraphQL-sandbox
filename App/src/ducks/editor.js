const SET_NOTE_EDITOR = 'SET_NOTE_EDITOR';
const CHANGE_NOTE_EDITOR = 'CHANGE_NOTE_EDITOR';

export const setEditor = note => ({
  type: SET_NOTE_EDITOR,
  note,
});

export const changeNote = note => ({
  type: CHANGE_NOTE_EDITOR,
  note,
});

export const editor = (state = {}, action) => {
  switch (action.type) {
    case SET_NOTE_EDITOR: {
      return action.note;
    }
    case CHANGE_NOTE_EDITOR: {
      return { ...action.note };
    }
    default: {
      return state;
    }
  }
};
