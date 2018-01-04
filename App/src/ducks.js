export const GET_USERS = 'GET_USERS';
export const GOT_USERS = 'GOT_USERS';
export const USER_DELETE = 'USER_DELETE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const USER_ADD = 'USER_ADD';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_UPDATE = 'USER_UPDATE';

export const addUser = payload => ({
  type: USER_ADD,
  payload,
});

export const getUsers = () => ({
  type: GET_USERS,
});

export const updateUser = user => ({
  type: USER_UPDATE,
  user,
});

export const deleteUser = id => ({
  type: USER_DELETE,
  id,
});

export const users = (state = { list: [] }, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case GOT_USERS: {
      return {
        ...state,
        list: [...action.users],
        isFetching: false,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        isFetching: false,
        errorFetching: true,
      };
    }
    case USER_DELETE: {
      return {
        list: state.list.filter(user => user.id !== action.id),
      };
    }
    case USER_ADD: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case USER_ADD_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.user],
        isFetching: false,
      };
    }
    case USER_UPDATE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    default: {
      return state;
    }
  }
};
