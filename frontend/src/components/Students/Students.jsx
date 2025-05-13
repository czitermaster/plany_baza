import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] =
    useState("all");
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

  // Filter students based on search term and category
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();

    switch (searchCategory) {
      case "firstname":
        return student.imie
          .toLowerCase()
          .includes(searchLower);
      case "lastname":
        return student.nazwisko
          .toLowerCase()
          .includes(searchLower);
      case "pesel":
        return student.pesel.includes(searchTerm);
      case "phone":
        return student.telefon.includes(searchTerm);
      case "id":
        return student.id_student
          .toString()
          .includes(searchTerm);
      default: // "all"
        return (
          student.imie
            .toLowerCase()
            .includes(searchLower) ||
          student.nazwisko
            .toLowerCase()
            .includes(searchLower) ||
          student.pesel.includes(searchTerm) ||
          student.telefon.includes(searchTerm) ||
          student.id_student.toString().includes(searchTerm)
        );
    }
  });

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Zarzadzanie studentami</h2>
        <div className="search-container">
          <div className="search-controls">
            <select
              value={searchCategory}
              onChange={(e) =>
                setSearchCategory(e.target.value)
              }
              className="search-select"
            >
              <option value="all">Wszystkie pola</option>
              <option value="firstname">Imię</option>
              <option value="lastname">Nazwisko</option>
              <option value="pesel">PESEL</option>
              <option value="phone">Telefon</option>
              <option value="id">ID studenta</option>
            </select>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={
                  searchCategory === "all"
                    ? "Szukaj we wszystkich polach..."
                    : searchCategory === "firstname"
                    ? "Szukaj po imieniu..."
                    : searchCategory === "lastname"
                    ? "Szukaj po nazwisku..."
                    : searchCategory === "pesel"
                    ? "Szukaj po PESEL..."
                    : searchCategory === "phone"
                    ? "Szukaj po telefonie..."
                    : "Szukaj po ID studenta..."
                }
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="search-input"
              />
              <i className="fas fa-search search-icon"></i>
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="scrollable-table">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>PESEL</th>
                <th>Telefon</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id_student}>
                    <td data-label="ID">
                      {student.id_student}
                    </td>
                    <td data-label="Imię">
                      {student.imie}
                    </td>
                    <td data-label="Nazwisko">
                      {student.nazwisko}
                    </td>
                    <td data-label="PESEL">
                      {student.pesel}
                    </td>
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
                            <i className="fas fa-eye"></i>{" "}
                            View
                          </Button>
                        </Link>
                        <Button
                          disabled={isPending}
                          variant="secondary"
                        >
                          <i className="fas fa-edit"></i>{" "}
                          Edit
                        </Button>
                        <Button
                          disabled={isPending}
                          variant="delete"
                          onClick={() =>
                            deleteStudent(
                              student.id_student
                            )
                          }
                        >
                          <i className="fas fa-trash"></i>{" "}
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-results">
                  <td colSpan="6">
                    Brak wyników wyszukiwania dla "
                    {searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
