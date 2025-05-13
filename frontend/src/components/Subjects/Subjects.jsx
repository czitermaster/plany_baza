import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] =
    useState("all");
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

  // Filter subjects based on search term and category
  const filteredSubjects = subjects.filter((subject) => {
    const searchLower = searchTerm.toLowerCase();

    switch (searchCategory) {
      case "name":
        return subject.nazwa_przedmiotu
          .toLowerCase()
          .includes(searchLower);
      case "ects":
        return subject.liczba_ects
          .toString()
          .includes(searchTerm);
      case "id":
        return subject.id_przedmioty
          .toString()
          .includes(searchTerm);
      default: // "all"
        return (
          subject.nazwa_przedmiotu
            .toLowerCase()
            .includes(searchLower) ||
          subject.liczba_ects
            .toString()
            .includes(searchTerm) ||
          subject.id_przedmioty
            .toString()
            .includes(searchTerm)
        );
    }
  });

  return (
    <div className="subjects-container">
      <div className="subjects-header">
        <h2>Zarządzanie przedmiotami</h2>
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
              <option value="name">Nazwa przedmiotu</option>
              <option value="ects">Liczba ECTS</option>
              <option value="id">ID przedmiotu</option>
            </select>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={
                  searchCategory === "all"
                    ? "Szukaj we wszystkich polach..."
                    : searchCategory === "name"
                    ? "Szukaj po nazwie przedmiotu..."
                    : searchCategory === "ects"
                    ? "Szukaj po liczbie ECTS..."
                    : "Szukaj po ID przedmiotu..."
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
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
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
                          <i className="fas fa-edit"></i>{" "}
                          Edit
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
                ))
              ) : (
                <tr className="no-results">
                  <td colSpan="4">
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

export default Subjects;
