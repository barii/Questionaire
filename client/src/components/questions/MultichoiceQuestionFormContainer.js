import React from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MultichoiceQuestionForm from './MultichoiceQuestionForm';

export class MultichoiceQuestionFormContainer extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      errors: {},
      question: this.props.question
    }

  };

  onChange = (e, idx) => {
    const {name, value} = e.target;
    if(idx===undefined) {
      this.setState(prev => ({
        question: {
          ...prev.question,
          [name]:  value
        }
      }))
    } else {
      this.setState(prev => ({
        question: {
          ...prev.question,
          [name]: prev.question[name].map(f => (f.id === idx) ? {...f, 'value': value} : f)
        }
      }))
    } 
  }

  onAdd = () => {
    this.setState(prev => ({
      question: {
        ...prev.question,
        choices: [
          ...prev.question.choices,
          {id: uuid(), value:""}
        ]
      }
    }))
  }

  isempty = (e) => {
    console.log(!e.value)
    return !e.value;
  }

  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.question.text) {
      errors.text = 'Please provide text.';
    }

    if (this.state.question.choices.some(this.isempty)) {
      errors.choices = {};//'Please provide value for all choices.';
      this.state.question.choices.filter(this.isempty).forEach(choice => 
        errors.choices[choice.id] = 'Please provide value for all choices'
      )
    }

    this.setState(() => ({ errors }));

    if(Object.keys(errors).length === 0) {
      this.props.onSubmit(this.state.question);
    }
  };


  

  render() {
    return <MultichoiceQuestionForm 
      question={this.state.question} 
      errors={this.state.errors}
      onChange={this.onChange} 
      onSubmit={this.onSubmit}
      onAdd={this.onAdd}
    />
  }
}


MultichoiceQuestionFormContainer.defaultProps = {
  question: {
    _id: uuid(),
    type:"multichoice",
    text:'',
    description:'',
    choices: [
      {
        _id: uuid(), 
        value:""
      },
      {
        _id: uuid(), 
        value:""
      }
    ]
  }
};

MultichoiceQuestionFormContainer.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }),
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(MultichoiceQuestionFormContainer);