import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      errors: {},
      question: this.props.question
    };

  }

  onChange = (e) => {
    const target = e.target
    this.setState(prev => ({
      question: {
        ...prev.question,
        [target.name]:  target.value
      }
    }))
  }



  onEdit = (e) => {
    e.preventDefault();

    this.setState({ editing: true });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.question.text) {
      this.setState(() => ({ error: 'Please provide text.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.addQuestion(this.state.question);
      this.setState(() => ({ editing: false }));
    }
  };


  // render() {
  //   if (this.state.editing) {
  //     return <OpenQuestionForm 
  //       question={this.state.question} 
  //       errors={this.state.errors}
  //       onChange={this.onChange} 
  //       onSubmit={this.onSubmit}
  //     />
  //   } else {
  //     return <OpenQuestionPanel 
  //       question={this.state.question} 
  //       onEdit={this.onEdit}
  //     />
  //   }
  // }

}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Question);