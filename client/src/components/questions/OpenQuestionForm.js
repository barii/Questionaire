import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { Form, Button, Card, CardHeader, CardBody } from 'reactstrap';


export default function OpenQuestionForm({question, errors, onChange, onSubmit}) {
  return (
    <div>
    <Card>
      <CardHeader>Open Question</CardHeader>
      <CardBody>
        <Form onSubmit={onSubmit} >
          <TextFieldGroup
            label="Text"
            name="text"
            value={question.text}
            onChange={(e) => onChange(e)}
            error={errors.text}
          />
          <TextFieldGroup
            label="Description"
            name="description"
            value={question.description}
            onChange={(e) => onChange(e)}
            error={errors.description}
          />

          <Button type="submit" color="success">Save</Button>
        </Form>
      </CardBody>
    </Card>
  </div>
  )
}
