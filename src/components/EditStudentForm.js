import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { editStudent } from "services/studentsHandlers";

export default function EditStudentForm({ student, toggle, toggleNested }) {
  const [error, setError] = useState(false);
  async function handleEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await editStudent(student.id, formData);
    if (response.ok) {
      toggle();
    } else {
      setError(true);
    }
  }
  return (
    <Form onSubmit={handleEdit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={student?.name}
          invalid={error}
        />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          defaultValue={student?.age}
          invalid={error}
        />
      </FormGroup>
      <FormGroup>
        <Label for="gender">Gender</Label>
        <Input
          id="gender"
          name="gender"
          type="select"
          defaultValue={student?.gender}
          invalid={error}
        >
          <option>F</option>
          <option>M</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="education">Education</Label>
        <Input
          id="education"
          name="education"
          type="text"
          defaultValue={student?.education}
          invalid={error}
        />
      </FormGroup>
      <FormGroup>
        <Label for="academicYear">Academic Year</Label>
        <Input
          id="academicYear"
          name="academicYear"
          type="number"
          defaultValue={student?.academicYear}
          invalid={error}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Edit
      </Button>
      <Button color="danger" onClick={toggleNested}>
        Delete
      </Button>
    </Form>
  );
}
