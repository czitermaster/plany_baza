import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./students.css";
import Button from "../Button/Button";
import { Link } from "react-router";

const LoadingStudents = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

const StudentsListError = ({ error }) => {
  return <div>{error}</div>;
};

const Students = () => {
  const qc = useQueryClient();
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await API.getStudents();
      return response.data;
    },
  });

  const { mutate: deleteStudent, isPending } = useMutation({
    mutationFn: async (id) => API.deleteStudent(id),
    onSuccess: async () => {
      await qc.invalidateQueries(["students"]);
    },
  });

  if (isLoading) {
    return <LoadingStudents />;
  }

  if (error) {
    return <StudentsListError error={error.message} />;
  }

  return (
    <div className="students-container">
      <h2> Zarzadzanie studentami </h2>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Pesel</th>
            <th>Telefon</th>
            <th className="actions-column">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id_student}>
              <td data-label="ID">{student.id_student}</td>
              <td data-label="Imie">{student.imie}</td>
              <td data-label="Nazwisko">
                {student.nazwisko}
              </td>
              <td data-label="Pesel">{student.pesel}</td>
              <td data-label="Telefon">
                {student.telefon}
              </td>
              <td
                data-label="Actions"
                className="actions-cell"
              >
                <div className="action-buttons">
                  <Link
                    to={`/studenci/${student.id_student}`}
                  >
                    <Button
                      disabled={isPending}
                      variant="primary"
                    >
                      <i className="fas fa-eye"></i> View
                    </Button>
                  </Link>
                  <Button
                    disabled={isPending}
                    variant="secondary"
                  >
                    <i className="fas fa-edit"></i> Edit
                  </Button>
                  <Button
                    disabled={isPending}
                    variant="delete"
                    onClick={() =>
                      deleteStudent(student.id_student)
                    }
                  >
                    <i className="fas fa-trash"></i> Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
