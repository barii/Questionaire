import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from '../../testUtils'
import { OpenQuestionFormContainer } from '../../../components/questions/OpenQuestionFormContainer';


const question = {
  type: "OpenQuestion",
  id: '1',
  text: "Text",
  description: ""
}
const questionWithEmptyText = {
  type: "OpenQuestion",
  id: '1',
  text: "",
  description: ""
}

const onSubmit = jest.fn();
const setup = (initialState={}) => {
  return shallow(<OpenQuestionFormContainer {...initialState} onSubmit={onSubmit} />);
} 

it('should not throw warning with expected props', () => {
  checkProps(OpenQuestionFormContainer, {question, onSubmit})
});

it('should render OpenQuestionFormContainer correctly (SNAPSHOT)', () => {
  const wrapper = setup({question});
  expect(wrapper).toMatchSnapshot();
});

it('should have a question, but no error in state after creation', () => {
  const wrapper = setup({question});
  expect(wrapper.state('question')).toEqual(question);
  expect(wrapper.state('errors')).toEqual({});
});

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

