import React from 'react';
import { shallow } from 'enzyme';
import { MultichoiceQuestionFormContainer } from '../../../components/questions/MultichoiceQuestionFormContainer';

const question = {
  type: "MultichoiceQuestion",
  id: '1',
  text: "Text",
  description: "",
  choices: [
    {
      id: '1',
      value: "Choice 1"
    }
  ]
}
const questionWithEmptyText = {
  type: "MultichoiceQuestion",
  id: '1',
  text: "",
  description: "",
  choices: [
    {
      id: '1',
      value: "Choice 1"
    }
  ]
}

const onSubmit = jest.fn();
const setup = (initialState={}) => {
  return shallow(<MultichoiceQuestionFormContainer {...initialState} onSubmit={onSubmit} />);
} 

// it('should render OpenQuestionFormContainer correctly (SNAPSHOT)', () => {
//   const wrapper = setup({question});
//   expect(wrapper).toMatchSnapshot();
// });

it('should have a question, but no error in state after creation', () => {
  const wrapper = setup({question});
  expect(wrapper.state('question')).toEqual(question);
  expect(wrapper.state('errors')).toEqual({});
});

describe('Update the state', () => {
  it('should update state.name correctly after content of textbox is changed', () => {
    const wrapper = setup({question});
    const newText = 'new Text';
    wrapper.instance().onChange({ target: {name: 'text', value: newText }} );
    expect(wrapper.state('question')).toEqual({...question, text: newText});
  });

  it('should update state.desctiption correctly after content of textbox is changed', () => {
    const wrapper = setup({question});
    const newDescription = 'new description';
    wrapper.instance().onChange({ target: {name: 'description', value: newDescription }} );
    expect(wrapper.state('question')).toEqual({...question, description: newDescription});
  });

  it('should update state.choices[0] correctly after content in textbox is changed', () => {
    const wrapper = setup({question});
    const newChoiceValue = 'updated Choice 1';
    const id = '1'
    wrapper.instance().onChange({ target: {name: 'choices', value: newChoiceValue }}, id);
    expect(wrapper.state('question').choices.filter(c => c.id === id)[0].value).toEqual(newChoiceValue);
  });  
});

describe('Adding new value', () => {
  it('should add a choice correctly', () => {
    const wrapper = setup({question});
  
    expect(wrapper.state('question').choices.length).toEqual(1);
    wrapper.instance().onAdd();
    expect(wrapper.state('question').choices.length).toEqual(2);
  
  });  
});

describe('Submitting', () => {
  it('should throw an error if submitted with emoty text', () => {
    const wrapper = setup({question: questionWithEmptyText});
    wrapper.instance().onSubmit({ preventDefault() {} } );

    expect(wrapper.state('errors')).not.toEqual({});
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should be submitted with correct state', () => {
    const wrapper = setup({question});

    wrapper.instance().onSubmit({ preventDefault() {} } );

    expect(wrapper.state('errors')).toEqual({});
    expect(onSubmit).toHaveBeenCalled();
  });
});

