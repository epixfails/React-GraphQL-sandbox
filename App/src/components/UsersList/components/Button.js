import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsers } from '../../../ducks';

const StyledButton = styled.button`
  background: #fff;
  padding: 5px;
  border: none;
  cursor: pointer;

  & :hover {
    background: #252525;
  }
`;

const Button = props => (
  <StyledButton onClick={props.getUsers}>Refresh</StyledButton>
);

const mapDispatchToProps = { getUsers };

export default connect(null, mapDispatchToProps)(Button);
