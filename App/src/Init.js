import { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './ducks';

class Init extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return null;
  }
}

const mapStateToProps = {
  getUsers,
};

export default connect(null, mapStateToProps)(Init);
