import uuid from 'uuid';

class MultiChoiceQuestion {
  constructor(description, text, choices) {
    this.id = uuid();
    this.description = description;
    this.text = text;
    this.choices = choices;
  }
}

export const addMultichoiceQuestion = (
  {
    description = '',
    text = '',
    choices = []
  } = {}
) => ({
  type: 'ADD_MULTICHOICE_QUESTION',
  question: new MultiChoiceQuestion(
    description,
    text,
    choices)
});

export const removeMultichoiceQuestion = ({ id } = {}) => ({
  type: 'REMOVE_MULTICHOICE_QUESTION',
  id
});

export const editMultichoiceQuestion = (id, updates) => ({
  type: 'EDIT_MULTICHOICE_QUESTION',
  id,
  updates
});
