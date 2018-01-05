import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getDateFormatted } from '~/utils';
import { deleteNote, updateNote } from '~/ducks';
import { setEditor, Editor } from '../../Editor';

const Wrapper = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #90caf9;
  }
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

class ListItem extends Component {
  state = {
    id: this.props.note.id,
    title: this.props.note.title,
    content: this.props.note.content,
  };

  handleSave = () => {
    const { id, title, content } = this.state;
    this.props.updateNote({
      id,
      title,
      content,
    });
  };

  render() {
    const { note, noteInEditor } = this.props;
    const isEdited = noteInEditor.id === note.id;
    return (
      <div>
        {isEdited ? (
          <Editor />
        ) : (
          <Wrapper onClick={() => this.props.setEditor(note)}>
            <DateEdited>
              Created: {getDateFormatted(note.date_updated)}
            </DateEdited>
            <NoteContent>
              <Text>{note.title}</Text>
              <Text content>{note.content}</Text>
              <ButtonAction onClick={() => this.props.deleteNote(note.id)}>
                remove
              </ButtonAction>
            </NoteContent>
          </Wrapper>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInEditor: state.editor,
});

const mapDispatchToProps = {
  deleteNote,
  updateNote,
  setEditor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
