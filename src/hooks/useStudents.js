import { useEffect, useState } from "react";
import { get } from "services/api";

const PATH = "/Student/GetStudents";

export function useStudents(filter, studentsPeerPage = 10) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [studentsCollection, setStudentsCollection] = useState([]);

  const sortFields = studentsCollection[0]
    ? Object.keys(studentsCollection[0])
    : [];

  function toggleOrder() {
    const update = order === "asc" ? "desc" : "asc";
    setOrder(update);
    sortStudents(sortBy, update);
  }

  function changeSortBy(value) {
    sortFields.includes(value) ? setSortBy(value) : setSortBy(sortFields[0]);
    sortStudents(value, order);
  }

  function sortStudents(value, order) {
    const returnValue = order === "desc" ? 1 : -1;

    setStudentsCollection([
      ...filteredStudents.sort((a, b) => {
        return a[value] > b[value] ? returnValue * -1 : returnValue;
      }),
    ]);
  }

  function revalidate() {
    get(PATH).then(setStudentsCollection).catch(console.log);
  }

  useEffect(() => {
    revalidate();
  }, []);

  const filteredStudents = studentsCollection.filter((student) => {
    return (
      student.name.toLowerCase().includes(filter.toLowerCase()) ||
      student.education.toLowerCase().includes(filter.toLowerCase())
    );
  });

  function getTotalPages() {
    return Math.ceil(filteredStudents?.length / studentsPeerPage);
  }
  function getCurrentPage() {
    const totalPages = getTotalPages();
    if (!totalPages) {
      return 1;
    }
    if (page > totalPages) {
      setPage(totalPages);
      return totalPages;
    }
    return page;
  }

  const students = {
    students: filteredStudents?.slice(
      (page - 1) * studentsPeerPage,
      page * studentsPeerPage,
    ),
    currentPage: getCurrentPage(),
    totalPages: getTotalPages(),
    nextPage: () => {
      if (students.currentPage < students.totalPages) setPage(page + 1);
    },
    prevPage: () => {
      if (students.currentPage > 1) setPage(page - 1);
    },
    goto: (p) => {
      if (p > 0 && p <= students.totalPages) setPage(p);
    },
  };

  return {
    students,
    revalidate,
    order,
    toggleOrder,
    sortStudents,
    changeSortBy,
    sortFields,
  };
}
