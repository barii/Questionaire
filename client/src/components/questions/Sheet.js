import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';
import { Jumbotron, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import OpenQuestion from './OpenQuestion'
import MultichoiceQuestion from './MultichoiceQuestion'
import OpenQuestionFormContainer from './OpenQuestionFormContainer'
import MultichoiceQuestionFormContainer from './MultichoiceQuestionFormContainer'

const questionTypes = {
  'open': {
    'text': 'Open question',
    'component':   OpenQuestion,
    'addComponent': OpenQuestionFormContainer
  },
  'multichoice': {
    'text': 'Multichoice question',
    'component':   MultichoiceQuestion,
    'addComponent': MultichoiceQuestionFormContainer
  },
  
}


class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      value: 'open',
      questions: props.questions
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ questions: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/questions');

    if (response.status !== 200) throw Error(response.json().message);

    return response.json();
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    console.log(response);
    const body = await response.text();
    this.setState({ responseToPost: body });
  };


  select(value) {
    this.setState({
      value
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onUpdateQuestion = (question) => {
    this.setState(prevState => ({
      questions: prevState.questions.map((q) => {
        if (q.id === question.id) {
          return question;
        } else {
          return q;
        }
      })
    }));
  }

  callAddApi = async () => {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    console.log(response);
    const body = await response.text();
    resolve(body);
  }

  onAddQuestion = (question) => {
    this.callAddApi(question)
      .then(res => 
        this.setState(prevState => ({
          questions: [
            ...prevState.questions,
            {
              ...question,
              type: this.state.value,
              id: uuid()
            }
          ]
        }))
      )
      .catch(err => console.log(err));
    

  }


  render() {
    const questionComponentList = this.state.questions.map((question, i) => {
      const ComponentEdit = questionTypes[question.type].component;
      return <ComponentEdit key={question.id} question={question} errors={{}} onSubmit={(q) => this.onUpdateQuestion(q) } />
    })

    const AddNewQuestion = questionTypes[this.state.value].addComponent;

    const addNewQuestionComponentList = Object.keys(questionTypes).map((key) => {
      return <DropdownItem key={key} onClick={(e) => this.select(key)}>{questionTypes[key].text}</DropdownItem>
    });


    return (
      <div>
        {questionComponentList}

        <Jumbotron>
          <h1 className="display-3">Add new question</h1>
          <Dropdown isOpen={this.state.dropdownOpen} onChange={this.onChange} toggle={this.toggle}>
            <DropdownToggle caret>
              Question type
            </DropdownToggle>
            <DropdownMenu>
              {addNewQuestionComponentList}
            </DropdownMenu>
          </Dropdown>

          <AddNewQuestion key={uuid()} onSubmit={(q) => this.onAddQuestion(q) } />

        </Jumbotron>
      </div>
    )
  }
}

Sheet.defaultProps = {
  questions: [
    // {
    //   _id: '1',
    //   type: "open",
    //   text: "haha",
    //   description: "desc"
    // },
    // {
    //   _id: '2',
    //   type: "multichoice",
    //   text: "haha",
    //   description: "desc",
    //   choices: [
    //     {'_id': '1', 'value':'optnion1'},
    //     {'_id': '2', 'value':'optnion2'}
    //   ]
    // }
  ]
}

export default Sheet;