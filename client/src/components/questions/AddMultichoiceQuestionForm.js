import React from 'react';
import { connect } from 'react-redux';
import { addMultichoiceQuestion } from '../../actions/multichoiceQuestion';
import { Form, Button, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

class AddMultichoiceQuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.question ? props.question.text : '',
      description: props.question ? props.question.description : '',
      choices: props.question ? props.question.choices : [{id: uuid(), value:''}],
      error: ''
    };
  };
  onTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onChoiceChange = (e, idx) => {
    let choices = this.state.choices;
    choices[idx].value = e.target.value;

    if (choices[choices.length-1].value!=='') {
      choices = [
        ...choices,
        {id: uuid(), value:""}
      ];
    }

    this.setState(() => ({ choices }));

  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.text) {
      this.setState(() => ({ error: 'Please provide text.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.dispatch(addMultichoiceQuestion({
        description: this.state.description,
        text: this.state.text,
        choices: this.state.choices
      }));
    }
//    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <Form onSubmit={this.onSubmit} horizontal> 
          <FormGroup controlId="formInlineName">
            <Col componentClass={ControlLabel} sm={2}>
              Text
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                placeholder="Text"
                autoFocus
                value={this.state.text}
                onChange={this.onTextChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={5}>
              <FormControl
                type="textarea"
                placeholder="Add a note for your question (optional)"
                value={this.state.description}
                onChange={this.onDescriptionChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <Col  componentClass={ControlLabel} sm={2}>
              Choices
            </Col>
            <Col sm={5}>
            {this.state.choices.map((choice, i) => (
                <FormControl
                  type="text"
                  value={choice.value}
                  key={choice.id}
                  onChange={(e) => this.onChoiceChange(e, i)}
                />
            ))}
            </Col>
          </FormGroup>
          <Button bsStyle="success"  type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

export default connect()(AddMultichoiceQuestionForm);