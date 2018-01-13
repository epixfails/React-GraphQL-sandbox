export const GET_NOTES = 'GET_USERS';
export const GOT_NOTES = 'GOT_USERS';
export const NOTE_DELETE = 'USER_DELETE';
export const NOTE_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const NOTE_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const NOTE_ADD = 'USER_ADD';
export const NOTE_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const NOTE_UPDATE = 'USER_UPDATE';

export const addNote = payload => ({
  type: NOTE_ADD,
  payload,
});

export const getNotes = () => ({
  type: GET_NOTES,
});

export const updateNote = note => ({
  type: NOTE_UPDATE,
  note,
});

export const deleteNote = id => ({
  type: NOTE_DELETE,
  id,
});

export const notes = (state = { list: [] }, action) => {
  switch (action.type) {
    case GET_NOTES: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case GOT_NOTES: {
      return {
        ...state,
        list: [...action.notes],
        isFetching: false,
      };
    }
    case NOTE_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case NOTE_UPDATE_ERROR: {
      return {
        ...state,
        isFetching: false,
        errorFetching: true,
      };
    }
    case NOTE_DELETE: {
      return {
        list: state.list.filter(note => note.id !== action.id),
      };
    }
    case NOTE_ADD: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case NOTE_ADD_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.note],
        isFetching: false,
      };
    }
    case NOTE_UPDATE: {
      const updatedList = state.list.map(note => {
        if (note.id === action.note.id) {
          return { ...note, ...action.note };
        }
        return note;
      });
      return {
        list: [...updatedList],
        isFetching: true,
      };
    }
    default: {
      return state;
    }
  }
};
