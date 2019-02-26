import React from 'react';
import { shallow } from 'enzyme';
import MultichoiceQuestionForm from '../../../components/questions/MultichoiceQuestionForm';

const question = {
  type: "MultichoiceQuestion",
  id: '1',
  text: "haha",
  description: "desc",
  choices: [
    {
      id: 1,
      value: "Choice 1"
    }
  ]
}

const onSubmit = jest.fn()
const onChange = jest.fn()
const onAdd = jest.fn()

const wrapper = shallow(
  <MultichoiceQuestionForm 
    question={question} 
    errors
    onChange={onChange} 
    onSubmit={onSubmit}
    onAdd={onAdd} 
  />
);

it('should render MultichoiceQuestionForm correctly (snapshot)', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should call `onSubmit` on button click', () => {
  wrapper.find('Form').simulate('submit');
  expect(onSubmit).toHaveBeenCalled();
});

it('should call `onChange` on value update', () => {
  wrapper.find('TextFieldGroup[name="text"]').simulate('change');
  expect(onChange).toHaveBeenCalled();
});

it('should call `onChange` on description update', () => {
  wrapper.find('TextFieldGroup[name="description"]').simulate('change');
  expect(onChange).toHaveBeenCalled();
});

it('should call `onChange` on choice update', () => {
  wrapper.find('TextFieldGroup[name="description"]').simulate('change');
  expect(onChange).toHaveBeenCalled();
});

it('should call `onAdd` when `Add` button is clicked', () => {
  wrapper.find('#btnAdd').simulate('click');
  expect(onAdd).toHaveBeenCalled();
});
