import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from './ListItem';

const Wrapper = styled.div`
  margin: 40px auto;
`;

const NotesList = props => {
  const { notesArray } = props;
  return (
    <Wrapper>
      {notesArray.length > 0 &&
        notesArray.map(note => <ListItem note={note} key={note.id} />)}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  notesArray: state.notes.list || [],
});

export default connect(mapStateToProps)(NotesList);
