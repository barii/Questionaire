import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OpenQuestionForm from './OpenQuestionForm';

export class OpenQuestionFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      question: this.props.question
    }
  }

  onChange = (e) => {
    const target = e.target
    this.setState((state) => {
      return {
        question: {
          ...state.question,
          [target.name]:  target.value
        }
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.question.text) {
      errors.text = 'Please provide text.';
    }

    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.props.onSubmit(this.state.question);
    }
  };

  render() {
      return <OpenQuestionForm 
        question={this.state.question} 
        errors={this.state.errors}
        onChange={this.onChange} 
        onSubmit={this.onSubmit}
      />
  }
}

OpenQuestionFormContainer.defaultProps = {
  question: {
    _id:uuid(),
    type:"open",
    text:'',
    description:''
  }
};

OpenQuestionFormContainer.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(OpenQuestionFormContainer);