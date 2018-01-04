import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from './ListItem';

const Wrapper = styled.div`
  margin: 40px auto;
`;

const UsersList = props => {
  const { usersArray } = props;
  return (
    <Wrapper>
      {usersArray.length > 0 &&
        usersArray.map(user => <ListItem user={user} key={user.id} />)}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  usersArray: state.users.list || [],
});

export default connect(mapStateToProps)(UsersList);
