import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { Form } from 'react-bootstrap';

class AddOpenQuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //text: props.question ? props.question.text : '',
      //description: props.question ? props.question.description : '',
      errors: {}
    };

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.props.question.text) {
      this.setState(() => ({ error: 'Please provide text.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.addQuestion({
        description: this.props.question.description,
        text: this.props.question.text
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit} horizontal >
          <TextFieldGroup
            placeholder="Text"
            name="text"
            value={this.props.question.text}
            onChange={this.onChange}
            error={errors.text}
          />
          <TextFieldGroup
            placeholder="Description"
            name="description"
            value={this.props.question.description}
            onChange={this.onChange}
            error={errors.description}
          />

          <input type="submit" bsStyle="success"></input>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddOpenQuestionForm);