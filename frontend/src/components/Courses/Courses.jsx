import React, { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./courses.css";
import Button from "../Button/Button";
import { Link } from "react-router";
import { useCourses } from "../../hooks/useCourses";

const LoadingCourses = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

const CoursesListError = ({ error }) => {
  return <div>{error}</div>;
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] =
    useState("all");
  const qc = useQueryClient();

  const { data: courses, isLoading, error } = useCourses();

  const { mutate: deleteCourse, isPending } = useMutation({
    mutationFn: async (id) => API.deleteCourse(id),
    onSuccess: async () => {
      await qc.invalidateQueries(["courses"]);
    },
  });

  if (isLoading) {
    return <LoadingCourses />;
  }

  if (error) {
    return <CoursesListError error={error.message} />;
  }

  // Filter courses based on search term and category
  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();

    switch (searchCategory) {
      case "name":
        return course.nazwa_kierunku
          .toLowerCase()
          .includes(searchLower);
      case "level":
        return course.poziom_studiow
          .toLowerCase()
          .includes(searchLower);
      case "id":
        return course.id_kierunek
          .toString()
          .includes(searchTerm);
      default: // "all"
        return (
          course.nazwa_kierunku
            .toLowerCase()
            .includes(searchLower) ||
          course.poziom_studiow
            .toLowerCase()
            .includes(searchLower) ||
          course.id_kierunek.toString().includes(searchTerm)
        );
    }
  });

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2>Zarządzanie kierunkami</h2>
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
              <option value="name">Nazwa kierunku</option>
              <option value="level">Poziom studiów</option>
              <option value="id">ID kierunku</option>
            </select>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={
                  searchCategory === "all"
                    ? "Szukaj we wszystkich polach..."
                    : searchCategory === "name"
                    ? "Szukaj po nazwie kierunku..."
                    : searchCategory === "level"
                    ? "Szukaj po poziomie studiów..."
                    : "Szukaj po ID kierunku..."
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
          <table className="courses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa kierunku</th>
                <th>Poziom studiów</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id_kierunek}>
                    <td data-label="ID">
                      {course.id_kierunek}
                    </td>
                    <td data-label="Nazwa kierunku">
                      {course.nazwa_kierunku}
                    </td>
                    <td data-label="Poziom studiów">
                      {course.poziom_studiow}
                    </td>
                    <td
                      data-label="Actions"
                      className="actions-cell"
                    >
                      <div className="action-buttons">
                        <Link
                          to={`/kierunki/${course.id_kierunek}`}
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
                            deleteCourse(course.id_kierunek)
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

export default Courses;
