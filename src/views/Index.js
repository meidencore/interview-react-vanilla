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
import InteractivePagination from "components/Pagination";

const Index = () => {
  const [selected, setSelected] = useState(false);
  const [searchfield, setSearchfield] = useState("");
  const { students, revalidate, sortFields, changeSortBy, toggleOrder, order } =
    useStudents(searchfield);

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Row className="mt-3 mx-4" xs={4}>
        <Col>
          <InputGroup className="input-group-alternative">
            <InputGroupText>
              <i className="fas fa-search" />
            </InputGroupText>
            <Input placeholder="Search" type="text" onChange={onSearchChange} />
          </InputGroup>
        </Col>
        <Col>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={(e) => changeSortBy(e.target.value)}
          >
            {students.students[0] &&
              sortFields.map((entry, index) => (
                <option value={entry} key={index}>
                  Order by {entry}
                </option>
              ))}
          </Input>
        </Col>
        <Col>
          <Button color="primary" onClick={toggleOrder}>
            Switch order {order}
          </Button>
        </Col>
        <Col>
          <Button color="success" onClick={() => setSelected({ isNew: true })}>
            Create New Student
          </Button>
        </Col>
      </Row>
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
            {students.students.map((student) => {
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
      {students.totalPages > 0 && (
        <InteractivePagination
          currentPage={students.currentPage}
          totalPages={students.totalPages}
          next={students.nextPage}
          prev={students.prevPage}
          goto={students.goto}
        />
      )}
    </>
  );
};

export default Index;
