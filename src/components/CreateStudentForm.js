import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createStudent } from "services/studentsHandlers";

export default function CreateStudentForm({ toggle }) {
  const [error, setError] = useState(false);
  async function handleCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await createStudent(formData);
    if (response.ok) {
      toggle();
    } else {
      setError(true);
    }
  }
  return (
    <Form onSubmit={handleCreate}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input id="name" name="name" type="text" invalid={error} />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input id="age" name="age" type="number" invalid={error} />
      </FormGroup>
      <FormGroup>
        <Label for="gender">Gender</Label>
        <Input id="gender" name="gender" type="select" invalid={error}>
          <option>F</option>
          <option>M</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="education">Education</Label>
        <Input id="education" name="education" type="text" invalid={error} />
      </FormGroup>
      <FormGroup>
        <Label for="academicYear">Academic Year</Label>
        <Input
          id="academicYear"
          name="academicYear"
          type="number"
          invalid={error}
        />
      </FormGroup>
      <Button color="success" type="submit">
        Create
      </Button>
    </Form>
  );
}
