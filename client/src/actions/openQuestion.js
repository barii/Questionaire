import { v4 as uuid } from 'uuid';

export const addOpenQuestion = (
  {
    description = '',
    text = '',
  } = {}
) => ({
  type: 'ADD_OPEN_QUESTION',
  question: {
    id: uuid(),
    description,
    text,
  }
});

export const removeOpenQuestion = ({ id } = {}) => ({
  type: 'REMOVE_OPEN_QUESTION',
  id
});

export const editOpenQuestion = (id, updates) => ({
  type: 'EDIT_OPEN_QUESTION',
  id,
  updates
});
