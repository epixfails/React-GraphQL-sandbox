import { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from './components/NotesList';

class Init extends Component {
  componentDidMount() {
    this.props.getNotes();
  }
  render() {
    return null;
  }
}

const mapStateToProps = {
  getNotes,
};

export default connect(null, mapStateToProps)(Init);
