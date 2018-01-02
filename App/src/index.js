import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import 'babel-polyfill';
import { AddUser } from './components/InputForm';
import { store } from './store';
import { Button, UsersList } from './components/UsersList';

const AppWrap = styled.div`
  margin: auto;
  width: 50%;
`;

const App = () => (
  <Provider store={store}>
    <AppWrap>
      <AddUser />
      <UsersList />
      <Button />
    </AppWrap>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('.root'));
