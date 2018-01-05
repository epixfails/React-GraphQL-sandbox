import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { editor } from './components/Editor';
import { notes } from './ducks';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const rootReducer = combineReducers({ notes, editor });

const store = createStore(
  rootReducer,
  initialState,
  // eslint-disable-next-line
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
// eslint-disable-next-line
const getState = store.getState;

export { getState, store };
