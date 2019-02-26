import React from 'react';
import { connect } from 'react-redux';
import MultichoiceQuestionFormContainer from './MultichoiceQuestionFormContainer';
import MultichoiceQuestionPanel from './MultichoiceQuestionPanel';

class MultichoiceQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

  }

  // componentDidUpdate() {
  //   if (this.state.question != this.props.question) {
  //     this.setState({ question: this.props.question });
  //   }
  // }

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
      return <MultichoiceQuestionFormContainer
        question={this.props.question} 
        onSubmit={this.onSubmit}
      />
    } else {
      return <MultichoiceQuestionPanel 
        question={this.props.question} 
        onEdit={this.onEdit}
      />
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(MultichoiceQuestion);