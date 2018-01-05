import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateNote, deleteNote } from '~/ducks';
import { changeNote, setEditor } from './ducks';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  background: #f3f3f3;
  padding: 5px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 24px;
  border: none;
  background: transparent;
  border-bottom: 1px #000 solid;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  font-size: 14px;

  > button:first-child {
    margin-left: 20px;
  }
`;

const InputContent = styled.textarea`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  border: none;
  box-sizing: border-box;
  background: transparent;
  resize: none;
`;

const Button = styled.button`
  width: 100px;
  margin-top: 5px;
  padding: 5px 7px;
  font-size: 14px;
  border: none;
  background: transparent;
  cursor: pointer;

  ${({ save }) => (save ? 'color: #4a148c' : 'color: #e57373')};

  & :hover {
    background: #90caf9;
  }
`;

class Editor extends Component {
  getTitleRef = ref => {
    this.titleInput = ref;
  };
  getContentRef = ref => {
    this.contentInput = ref;
  };

  handleKeyUp = e => {
    const { note } = this.props;
    if (e.keyCode === 13) {
      this.props.updateNote(this.props.note);
    } else if (e.keyCode === 27) {
      return this.props.setEditor({});
    }
    return this.props.changeNote({
      id: note.id,
      title: this.titleInput.value,
      content: this.contentInput.value,
    });
  };

  handleSave = () => {
    this.props.updateNote(this.props.note);
    this.props.setEditor({});
  };

  render() {
    const { note } = this.props;

    return (
      <Wrapper>
        <Input
          innerRef={this.getTitleRef}
          value={note.title}
          onChange={this.handleKeyUp}
          onKeyUp={this.handleKeyUp}
        />
        <InputContent
          innerRef={this.getContentRef}
          value={note.content}
          onChange={this.handleKeyUp}
          onKeyUp={this.handleKeyUp}
        />
        <Controls>
          <Button save onClick={this.handleSave}>
            save
          </Button>
          <Button onClick={() => this.props.deleteNote(this.props.note.id)}>
            remove
          </Button>
        </Controls>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  note: state.editor,
});

const mapDispatchToProps = {
  changeNote,
  setEditor,
  updateNote,
  deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
