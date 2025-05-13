import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./subjects.css";
import Button from "../Button/Button";
import { Link } from "react-router";

const LoadingSubjects = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

const SubjectsListError = ({ error }) => {
  return <div>{error}</div>;
};

const Subjects = () => {
  const qc = useQueryClient();
  const {
    data: subjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await API.getSubjects();
      return response.data;
    },
  });

  const { mutate: deleteSubject, isPending } = useMutation({
    mutationFn: async (id) => API.deleteSubject(id),
    onSuccess: async () => {
      await qc.invalidateQueries(["subjects"]);
    },
  });

  if (isLoading) {
    return <LoadingSubjects />;
  }

  if (error) {
    return <SubjectsListError error={error.message} />;
  }

  return (
    <div className="subjects-container">
      <h2> Zarzadzanie przedmiotami </h2>

      <div className="table-wrapper">
        <div className="scrollable-table">
          <table className="subjects-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa przedmiotu</th>
                <th>Liczba ECTS</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id_przedmioty}>
                  <td data-label="ID">
                    {subject.id_przedmioty}
                  </td>
                  <td data-label="Nazwa przedmiotu">
                    {subject.nazwa_przedmiotu}
                  </td>
                  <td data-label="Liczba ECTS">
                    {subject.liczba_ects}
                  </td>
                  <td
                    data-label="Actions"
                    className="actions-cell"
                  >
                    <div className="action-buttons">
                      <Link
                        to={`/przedmioty/${subject.id_przedmioty}`}
                      >
                        <Button
                          disabled={isPending}
                          variant="primary"
                        >
                          <i className="fas fa-eye"></i>{" "}
                          View
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
                          deleteSubject(
                            subject.id_przedmioty
                          )
                        }
                      >
                        <i className="fas fa-trash"></i>{" "}
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
