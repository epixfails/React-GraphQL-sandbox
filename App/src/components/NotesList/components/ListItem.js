import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getDateFormatted } from '~/utils';
import { deleteNote, updateNote } from '~/ducks/notes';
import { setEditor } from '~/ducks/editor';
import { setFilter } from '~/ducks/filter';
import { categories } from '~/components/common/categories';
import { Editor } from '../../Editor';

const Wrapper = styled.div`
  padding: 15px 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #90caf9;
  }
`;

const Label = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  ${({ category }) => `background: ${categories[category]}`};
`;

const Text = styled.span`
  display: block;
  height: 24px;
  line-height: 24px;
  width: 40%;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;

  ${({ content }) => (content ? 'font-size: 14px' : 'font-size: 18px')};
`;

const DateEdited = styled.p`
  color: #747474;
  margin: 0 0 5px 0;
  font-size: 10px;
  text-align: left;
`;

const NoteContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonAction = styled.a`
  display: block;
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0;
  color: #4a148c;
  font-size: 14px;
  transition: all 0.3s;

  & :hover {
    color: #fff;
  }

  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

const ListItem = props => {
  const { note, noteInEditor } = props;
  const isEdited = noteInEditor.id === note.id;
  return (
    <div>
      {isEdited ? (
        <Editor />
      ) : (
        <Wrapper>
          <DateEdited>
            Created: {getDateFormatted(note.date_updated)}
          </DateEdited>
          <Content>
            <Label
              category={note.category}
              onClick={() => props.setFilter(note.category)}
            />
            <NoteContent onClick={() => props.setEditor(note)}>
              <Text>{note.title}</Text>
              <Text content="true">{note.content}</Text>
              <ButtonAction onClick={() => props.deleteNote(note.id)}>
                remove
              </ButtonAction>
            </NoteContent>
          </Content>
        </Wrapper>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  noteInEditor: state.editor,
});

const mapDispatchToProps = {
  deleteNote,
  updateNote,
  setEditor,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
