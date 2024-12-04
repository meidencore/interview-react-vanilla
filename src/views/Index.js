/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
import {
  Table,
  Container,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  Row,
  Col,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { useStudents } from "hooks/useStudents";
import StudentModal from "components/StudentModal";

const Index = () => {
  const [selected, setSelected] = useState(false);
  const [searchfield, setSearchfield] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const { students, setStudents, revalidate } = useStudents();

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  const filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  function updateOrder() {
    const update = order === "asc" ? "desc" : "asc";
    setOrder(update);
    sort(sortBy, update);
  }

  function sort(value, order) {
    const returnValue = order === "desc" ? 1 : -1;

    setSortBy(value);
    setStudents([
      ...students.sort((a, b) => {
        return a[value] > b[value] ? returnValue * -1 : returnValue;
      }),
    ]);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      {students[0] && (
        <Row className="mt-3 mx-4" xs={4}>
          <Col>
            <InputGroup className="input-group-alternative">
              <InputGroupText>
                <i className="fas fa-search" />
              </InputGroupText>
              <Input
                placeholder="Search"
                type="text"
                onChange={onSearchChange}
              />
            </InputGroup>
          </Col>
          <Col>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(e) => sort(e.target.value, order)}
            >
              {Object.keys(students[0]).map((entry, index) => (
                <option value={entry} key={index}>
                  Order by {entry}
                </option>
              ))}
            </Input>
          </Col>
          <Col>
            <Button color="primary" onClick={updateOrder}>
              Switch order ({order})
            </Button>
          </Col>
          <Col>
            <Button
              color="success"
              onClick={() => setSelected({ isNew: true })}
            >
              Create New Student
            </Button>
          </Col>
        </Row>
      )}
      <Container className="mt-5" fluid>
        <Table bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Education</th>
              <th>Academic Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const { id, name, gender, education, age, academicYear } =
                student;
              return (
                <tr key={id} onClick={() => setSelected(student)}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{gender}</td>
                  <td>{age}</td>
                  <td>{education}</td>
                  <td>{academicYear}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <StudentModal
          student={selected}
          close={setSelected}
          refresh={revalidate}
        />
      </Container>
    </>
  );
};

export default Index;
