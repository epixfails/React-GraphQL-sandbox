import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteUser } from '../../../ducks';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  padding: 0 20px;
  height: 40px;

  &:hover {
    background: #90caf9;
  }
`;

const Name = styled.span`
  display: block;
  font-size: 24px;
`;

const Address = styled.span`
  display: block;
  font-size: 18px;
`;

const ButtonDelete = styled.a`
  display: block;
  padding: 5px 10px;
  background: yellow;
  cursor: pointer;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

const ListItem = props => {
  const { user } = props;
  return (
    <Wrapper>
      <Name>{user.name}</Name>
      <Address>{user.address}</Address>
      <ButtonDelete onClick={() => props.deleteUser(user.id)}>
        remove
      </ButtonDelete>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  deleteUser,
};

export default connect(null, mapDispatchToProps)(ListItem);
