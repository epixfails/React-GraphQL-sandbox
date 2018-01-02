import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addUser } from '../../../ducks';

const Wrapper = styled.div`
  width: 400px;
  margin: auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px 10px;
  border: 1px #252525 solid;
  margin: 10px 0;
`;

const Button = styled.button`
  width: 250px;
  line-height: 24px;
  background: #4a76a8;
`;

class AddUser extends Component {
  getNameRef = input => {
    this.nameInput = input;
  };
  getAddressRef = input => {
    this.addressInput = input;
  };

  handleAdd() {
    this.props.addUser({
      name: this.nameInput.value.trim() || 'not specified',
      address: this.addressInput.value.trim() || 'not specified',
    });
  }

  render() {
    return (
      <Wrapper>
        <Input innerRef={this.getNameRef} placeholder="Name" />
        <Input innerRef={this.getAddressRef} placeholder="Address" />
        <Button onClick={() => this.handleAdd()}>Add to list</Button>
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
