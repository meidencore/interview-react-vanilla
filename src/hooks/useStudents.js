import { useEffect, useState } from "react";
import { get } from "services/api";

const PATH = "/Student/GetStudents";

export function useStudents() {
  const [students, setStudents] = useState([]);

  function revalidate() {
    get(PATH).then(setStudents).catch(console.log);
  }

  useEffect(() => {
    revalidate();
  }, []);

  return { students, setStudents, revalidate };
}
