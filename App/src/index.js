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
}
`;

const AppWrap = styled.div`
  margin: auto;
  width: 50%;
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

ReactDOM.render(<App />, document.querySelector('.root'));
