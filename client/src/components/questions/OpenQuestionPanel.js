import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';

export default function OpenQuestionPanel({question, onEdit}) {

  return (
    <div>
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <TextFieldGroup
            label={question.text}
            name="text"
            value=""
            onChange={(e) => {}}
            info={question.description}
          />

          <Button type="submit" color="success" onClick={onEdit}>Edit</Button>
        </CardBody>
      </Card>
    </div>
  )
}


