import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import ListFieldGroup from '../common/ListFieldGroup';
import { Form, Button, Card, CardHeader, CardBody } from 'reactstrap';


export default function MultichoiceQuestionForm({question, errors, onChange, onSubmit, onAdd}) {
  return (
    <div>
    <Card>
      <CardHeader>Header</CardHeader>
      <CardBody>
        <Form onSubmit={onSubmit} > 
          <TextFieldGroup
            label="Text"
            name="text"
            value={question.text}
            onChange={onChange}
            error={errors.text}
          />
          <TextFieldGroup
            label="Description"
            name="description"
            value={question.description}
            onChange={onChange}
            error={errors.description}
          />
          <ListFieldGroup
            label="Choices"
            name="choices"
            options={question.choices}
            onChange={onChange}
            error={errors.choices}
          />
          <div>
            <Button id="btnAdd" color="primary" onClick={onAdd}>Add</Button>
          </div>
          <div>
            <Button type="submit" color="success">Save</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  </div>
  );
}
