import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteUser, updateUser } from '~/ducks';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #90caf9;
  }

  > span {
    display: block;
    padding: 0 0 2px 1px;
    height: 23px;
    width: 30%;
  }
`;
const Text = styled.span``;

const Input = styled.input`
  width: 30%;
  font-size: 18px;
  line-height: 24px;
  border: none;
  background: transparent;
  border-bottom: 1px #000 solid;
`;

const ButtonAction = styled.a`
  display: block;
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0;
  color: #4a148c;
  font-size: 16px;
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
    isEditing: false,
    id: this.props.user.id,
    name: this.props.user.name,
    address: this.props.user.address,
  };

  componentDidUpdate = () => {
    if (this.state.eventTarget === 'name') {
      this.nameInput.focus();
    } else if (this.state.eventTarget === 'address') {
      this.addressInput.focus();
    }
  };

  getNameInputRef = input => {
    this.nameInput = input;
  };

  getAddressInputRef = input => {
    this.addressInput = input;
  };

  handleSave = () => {
    const { id, name, address } = this.state;
    this.props.updateUser({
      id,
      name,
      address,
    });
    this.setState({ isEditing: false, eventTarget: '' });
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleSave();
    } else if (e.keyCode === 27) {
      const { user } = this.props;
      this.setState({
        isEditing: false,
        id: user.id,
        name: user.name,
        address: user.address,
        eventTarget: '',
      });
    }
  };

  handleEditMode = eventTarget => {
    this.setState({
      isEditing: true,
      eventTarget,
    });
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {this.state.isEditing ? (
          <Wrapper>
            <Input
              value={this.state.name}
              innerRef={this.getNameInputRef}
              onChange={e => this.setState({ name: e.target.value })}
              onBlur={this.handleSave}
              onKeyUp={this.handleKeyUp}
            />
            <Input
              value={this.state.address}
              innerRef={this.getAddressInputRef}
              onChange={e => this.setState({ address: e.target.value })}
              onKeyUp={this.handleKeyUp}
              onBlur={this.handleSave}
            />
            <ButtonAction onClick={() => this.props.deleteUser(user.id)}>
              remove
            </ButtonAction>
          </Wrapper>
        ) : (
          <Wrapper>
            <Text onClick={() => this.handleEditMode('name')}>
              {this.state.name}
            </Text>
            <Text onClick={() => this.handleEditMode('address')}>
              {this.state.address}
            </Text>
            <ButtonAction onClick={() => this.props.deleteUser(user.id)}>
              remove
            </ButtonAction>
          </Wrapper>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteUser,
  updateUser,
};

export default connect(null, mapDispatchToProps)(ListItem);
