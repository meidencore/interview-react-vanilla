import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { removeStudent } from "services/studentsHandlers";
import EditStudentForm from "./EditStudentForm";
import CreateStudentForm from "./CreateStudentForm";

export default function StudentModal({ student, close, refresh }) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    await removeStudent(student.id);
    toggleAll();
  }

  const toggle = () => {
    setModal(!modal);
    close();
  };
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  return (
    <div>
      <Modal isOpen={!!student} toggle={toggle} onClosed={refresh}>
        <ModalHeader toggle={toggle}>
          {student?.isNew ? "Create student" : "Edit student"}
        </ModalHeader>
        <ModalBody>
          {student?.isNew ? (
            <CreateStudentForm toggle={toggle} />
          ) : (
            <EditStudentForm
              student={student}
              toggle={toggle}
              toggleNested={toggleNested}
            />
          )}
          <ConfirmModal
            nestedModal={nestedModal}
            toggleNested={toggleNested}
            closeAll={closeAll}
            toggle={toggle}
            handleDelete={handleDelete}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

function ConfirmModal({
  nestedModal,
  toggleNested,
  closeAll,
  toggle,
  handleDelete,
}) {
  return (
    <Modal
      isOpen={nestedModal}
      toggle={toggleNested}
      onClosed={closeAll ? toggle : undefined}
    >
      <ModalHeader>Are you sure you want to delete the student</ModalHeader>
      <ModalFooter>
        <Button color="primary" onClick={handleDelete}>
          Yes
        </Button>{" "}
        <Button color="secondary" onClick={toggleNested}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
}
