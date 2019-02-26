import React from 'react';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';

export default function MultichoiceQuestionPanel({question, onEdit}) {

  return (
    <div>
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <div className="form-group">
            <select className="form-control form-control-lg">
              {question.choices.map((choice, i) => (
                <option id={choice.id} key={choice.id}>{choice.value}</option>
              ))}
            </select>
          </div>

          <Button type="submit" color="success" onClick={onEdit}>Edit</Button>
        </CardBody>
      </Card>
    </div>
  )
}


