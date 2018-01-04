import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addUser } from '~/ducks';

const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 37%;
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

class AddUser extends Component {
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
    this.props.addUser({
      name: this.nameInput.value.trim() || 'not specified',
      address: this.addressInput.value.trim() || 'not specified',
    });
    this.form.reset();
  }

  render() {
    return (
      <Wrapper innerRef={this.getFormRef} onSubmit={e => this.handleAdd(e)}>
        <Input innerRef={this.getNameRef} placeholder="Name" />
        <Input innerRef={this.getAddressRef} placeholder="Name 2" />
        <Button>Add to list</Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
