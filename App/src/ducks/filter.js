const SET_FILTER = 'SET_FILTER';

export const setFilter = payload => ({
  type: SET_FILTER,
  payload,
});

export const filter = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload === state.filter ? '' : action.payload,
      };
    }
    default:
      return state;
  }
};
