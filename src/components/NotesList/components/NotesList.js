import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from './ListItem';

const Wrapper = styled.div`
  margin: 0 10px;
  width: 100%;
`;

const NotesList = props => {
  const { notesArray, filter } = props;
  const notesToList = filter
    ? notesArray.filter(note => note.category === props.filter)
    : notesArray;
  return (
    <Wrapper>
      {notesArray.length > 0 &&
        notesToList.map(note => <ListItem note={note} key={note.id} />)}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  notesArray: state.notes.list || [],
  filter: state.filter.filter,
});

export default connect(mapStateToProps)(NotesList);
