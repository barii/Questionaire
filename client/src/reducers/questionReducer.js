// Open Question Reducer

const questionReducerDefaultState = [];

export default (state = questionReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_OPEN_QUESTION':
      return [
        ...state,
        action.question
      ];
    case 'REMOVE_OPEN_QUESTION':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_OPEN_QUESTION':
      return state.map((question) => {
        if (question.id === action.id) {
          return {
            ...question,
            ...action.updates
          };
        } else {
          return question;
        }
      });

    case 'ADD_MULTICHOICE_QUESTION':
      console.log(action);
      return [
        ...state,
        action.question
      ];
    case 'REMOVE_MULTICHOICE_QUESTION':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_MULTICHOICE_QUESTION':
      return state.map((question) => {
        if (question.id === action.id) {
          return {
            ...question,
            ...action.updates
          };
        } else {
          return question;
        }
      });

    default:
      return state;
  }
};
