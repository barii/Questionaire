// Open Question Reducer

const multichoiceReducerDefaultState = [];

export default (state = multichoiceReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_MULTICHOICE_QUESTION':
      console.log(action);
      return [
        ...state,
        action.question
      ];
    case 'REMOVE_MULTICHOICE_QUESTION':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_MULTICHOICE_QUESTION':
      return state.map((expense) => {
        if (question.id === action.id) {
          return {
            ...question,
            ...action.updates
          };
        } else {
          return question;
        };
      });
    default:
      return state;
  }
};
