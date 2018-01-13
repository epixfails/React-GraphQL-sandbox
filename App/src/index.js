import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import 'babel-polyfill';
import { AddNote } from './components/InputForm';
import { store } from './store';
import { NotesList } from './components/NotesList';
import Init from './Init';

// eslint-disable-next-line
injectGlobal`
* {
  font-family: "Encode Sans Expanded", sans-serif;
  margin: 0;

  input {
    outline: none;
  }
}
`;

const AppWrap = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;

const App = () => (
  <Provider store={store}>
    <AppWrap>
      <Init />
      <AddNote />
      <NotesList />
    </AppWrap>
  </Provider>
);
// eslint-disable-next-line
ReactDOM.render(<App />, document.querySelector('.root'));
