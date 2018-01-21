import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNote } from '~/ducks/notes';
import { categories } from '~/components/common/categories';
import { CategorySelect } from './CategorySelect';

const Wrapper = styled.form`
  display: flex;
  flex-flow: column;
  width: 50%;
  height: 100%;
  padding: 15px 5px;
  background: rgba(144, 202, 249, 0.2);
  box-shadow: 4px 0px 21px -2px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px #cae7fe solid;

  &:focus {
    border-color: #9dd3fe;
  }
`;

const InputContent = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px #cae7fe solid;
  resize: none;
  outline: none;

  &:focus {
    border-color: #9dd3fe;
  }
`;

const Button = styled.button`
  line-height: 24px;
  font-size: 18px;
  padding: 10px;
  background: #90caf9;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  color: #fff;

  & :hover {
    color: #fff;
    background: #3ea6fb;
  }
`;

class AddNote extends Component {
  state = {
    category: 'other',
  };
  getNameRef = input => {
    this.nameInput = input;
  };
  getAddressRef = input => {
    this.addressInput = input;
  };

  getFormRef = form => {
    this.form = form;
  };

  getCategoryRef = form => {
    this.categoryInput = form;
  };

  handleCategoryChange = category => {
    this.setState({
      category,
    });
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleAdd(e);
    }
  };

  handleAdd(e) {
    e.preventDefault();
    this.props.addNote({
      title: this.nameInput.value.trim() || 'not specified',
      content: this.addressInput.value.trim() || 'not specified',
      category: this.state.category,
    });
    this.form.reset();
  }

  render() {
    return (
      <Wrapper innerRef={this.getFormRef} onSubmit={e => this.handleAdd(e)}>
        <Input
          innerRef={this.getNameRef}
          placeholder="Title"
          onKeyUp={this.handleKeyUp}
        />
        <InputContent
          innerRef={this.getAddressRef}
          onKeyUp={this.handleKeyUp}
          placeholder="Content"
          rows="5"
        />
        <CategorySelect
          categories={Object.keys(categories)}
          selected={this.state.category}
          handleChange={this.handleCategoryChange}
        />
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
