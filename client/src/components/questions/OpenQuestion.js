import React from 'react';
import { connect } from 'react-redux';
import OpenQuestionFormContainer from './OpenQuestionFormContainer';
import OpenQuestionPanel from './OpenQuestionPanel';


class OpenQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

  }

  onEdit = (e) => {
    e.preventDefault();

    this.setState({ editing: true });
  }

  onSubmit = (question) => {
    this.props.onSubmit(question);
    this.setState({ editing: false });
  };

  render() {
    if (this.state.editing) {
      return <OpenQuestionFormContainer
        question={this.props.question} 
        onSubmit={this.onSubmit} 
      />
    } else {
      return <OpenQuestionPanel 
        question={this.props.question} 
        onEdit={this.onEdit}
      />
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(OpenQuestion);