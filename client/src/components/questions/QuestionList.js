import React from 'react';
import { connect } from 'react-redux';
import QuestionListItemOpenQuestion from './QuestionListItemOpenQuestion';
//import selectExpenses from '../selectors/questions';

const QuestionList = (props) => (
  <div>
    <h1>Questions</h1>
    {props.questions.map((question) => {
      return <QuestionListItemOpenQuestion key={question.id} {...question} />;
    })}
  </div>
);

const mapStateToProps = (state) => {
  console.log(state);
  return {
    questions: state.questions//selectExpenses(state.question, state.filters)
  };
};

export default connect(mapStateToProps)(QuestionList);
