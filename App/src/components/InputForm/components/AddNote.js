import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNote } from '~/ducks';

const Wrapper = styled.form`
  display: flex;
  flex-flow: column;
  margin: 10px auto;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px #252525 solid;
`;

const Button = styled.button`
  display: block;
  width: 20%;
  line-height: 24px;
  font-size: 18px;
  background: #90caf9;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  color: #4a148c;

  & :hover {
    color: #fff;
    background: #3ea6fb;
  }
`;

class AddNote extends Component {
  getNameRef = input => {
    this.nameInput = input;
  };
  getAddressRef = input => {
    this.addressInput = input;
  };

  getFormRef = form => {
    this.form = form;
  };

  handleAdd(e) {
    e.preventDefault();
    this.props.addNote({
      title: this.nameInput.value.trim() || 'not specified',
      content: this.addressInput.value.trim() || 'not specified',
    });
    this.form.reset();
  }

  render() {
    return (
      <Wrapper innerRef={this.getFormRef} onSubmit={e => this.handleAdd(e)}>
        <Input innerRef={this.getNameRef} placeholder="Title" />
        <Input innerRef={this.getAddressRef} placeholder="Content" />
        <Button>Add note</Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  addNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
