import React from 'react';
import { Link } from 'react-router-dom';

const QuestionListItemOpenQuestion = ({ id, text, description }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{text}</h3>
    </Link>
    <p>{description}</p>
  </div>
);

export default QuestionListItemOpenQuestion;
