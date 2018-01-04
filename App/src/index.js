import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import 'babel-polyfill';
import { AddUser } from './components/InputForm';
import { store } from './store';
import { UsersList } from './components/UsersList';
import Init from './Init';

// eslint-disable-next-line
injectGlobal`
* {
  font-family: "Encode Sans Expanded", sans-serif
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
      <AddUser />
      <UsersList />
    </AppWrap>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('.root'));
