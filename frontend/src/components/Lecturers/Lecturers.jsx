import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./lecturers.css";
import Button from "../Button/Button";
import { Link } from "react-router";

const LoadingLecturers = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

const LecturersListError = ({ error }) => {
  return <div>{error}</div>;
};

const Lecturers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] =
    useState("all");
  const qc = useQueryClient();

  const {
    data: lecturers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const response = await API.getLecturers();
      return response.data;
    },
  });

  const { mutate: deleteLecturer, isPending } = useMutation(
    {
      mutationFn: async (id) => API.deleteLecturer(id),
      onSuccess: async () => {
        await qc.invalidateQueries(["lecturers"]);
      },
    }
  );

  if (isLoading) {
    return <LoadingLecturers />;
  }

  if (error) {
    return <LecturersListError error={error.message} />;
  }

  // Filter lecturers based on search term and category
  const filteredLecturers = lecturers.filter((lecturer) => {
    const searchLower = searchTerm.toLowerCase();

    switch (searchCategory) {
      case "firstname":
        return lecturer.imie
          .toLowerCase()
          .includes(searchLower);
      case "lastname":
        return lecturer.nazwisko
          .toLowerCase()
          .includes(searchLower);
      case "email":
        return lecturer.email
          .toLowerCase()
          .includes(searchLower);
      case "phone":
        return lecturer.telefon.includes(searchTerm);
      case "id":
        return lecturer.id_wykladowca
          .toString()
          .includes(searchTerm);
      default: // "all"
        return (
          lecturer.imie
            .toLowerCase()
            .includes(searchLower) ||
          lecturer.nazwisko
            .toLowerCase()
            .includes(searchLower) ||
          lecturer.email
            .toLowerCase()
            .includes(searchLower) ||
          lecturer.telefon.includes(searchTerm) ||
          lecturer.id_wykladowca
            .toString()
            .includes(searchTerm)
        );
    }
  });

  return (
    <div className="lecturers-container">
      <div className="lecturers-header">
        <h2>Zarządzanie wykładowcami</h2>
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
              <option value="email">Email</option>
              <option value="phone">Telefon</option>
              <option value="id">ID wykładowcy</option>
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
                    : searchCategory === "email"
                    ? "Szukaj po emailu..."
                    : searchCategory === "phone"
                    ? "Szukaj po telefonie..."
                    : "Szukaj po ID wykładowcy..."
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
          <table className="lecturers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Telefon</th>
                <th>Email</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredLecturers.length > 0 ? (
                filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id_wykladowca}>
                    <td data-label="ID">
                      {lecturer.id_wykladowca}
                    </td>
                    <td data-label="Imię">
                      {lecturer.imie}
                    </td>
                    <td data-label="Nazwisko">
                      {lecturer.nazwisko}
                    </td>
                    <td data-label="Telefon">
                      {lecturer.telefon}
                    </td>
                    <td data-label="Email">
                      {lecturer.email}
                    </td>
                    <td
                      data-label="Actions"
                      className="actions-cell"
                    >
                      <div className="action-buttons">
                        <Link
                          to={`/wykladowcy/${lecturer.id_wykladowca}`}
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
                            deleteLecturer(
                              lecturer.id_wykladowca
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

export default Lecturers;
