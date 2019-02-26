import React from 'react';
import { shallow } from 'enzyme';
import OpenQuestionForm from '../../../components/questions/OpenQuestionForm';

const question = {
  type: "OpenQuestion",
  id: '1',
  text: "haha",
  description: "desc"
}

const onSubmit = jest.fn()
const onChange = jest.fn()

const wrapper = shallow(
  <OpenQuestionForm
    question={question} 
    errors
    onChange={onChange} 
    onSubmit={onSubmit} 
  />
);

it('should render OpenQuestionForm correctly (snapshot)', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should call onSubmit on button click', () => {
  wrapper.find('Form').simulate('submit');
  expect(onSubmit).toHaveBeenCalled();
});

it('should call onChange on value update', () => {
  wrapper.find('TextFieldGroup[name="text"]').simulate('change');
  expect(onChange).toHaveBeenCalled();
});
