import React from 'react';
import { connect } from 'react-redux';
import AddOpenQuestionForm from './AddOpenQuestionForm';
import AddMultichoiceQuestionForm from './AddMultichoiceQuestionForm';
import QuestionList from './QuestionList';
import { Jumbotron, PageHeader, FormGroup, FormControl } from 'react-bootstrap';

class AddQuestionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionType: 'question'
    };
  }
  handleChange = (event) => {
    const questionType = event.target.value;
    this.setState(() => ({questionType}));
  };

  render() {
    let selects="";
    if (this.state.questionType==='question') {
      selects = (<AddOpenQuestionForm />);
    } else {
      selects = (<AddMultichoiceQuestionForm />);
    }
    
    return (
      <div>
      <QuestionList />  
      <Jumbotron>
          <PageHeader>Add Question</PageHeader>
          <FormGroup controlId="formControlsSelectMultiple">
            <FormControl componentClass="select" value={this.state.value} onChange={this.handleChange}>
              <option value="question">Question</option>
              <option value="multichoice-question">Multichoice</option>
            </FormControl>
          </FormGroup>  
          {selects}
        </Jumbotron>
        
      </div>
    );
  };
}

export default connect()(AddQuestionPage);
