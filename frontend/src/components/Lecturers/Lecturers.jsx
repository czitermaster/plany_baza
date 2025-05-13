import React, { useState } from "react";
import {
  useQuery,
  useMutation,
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

  // Filter lecturers based on search term
  const filteredLecturers = lecturers.filter((lecturer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      lecturer.imie.toLowerCase().includes(searchLower) ||
      lecturer.nazwisko
        .toLowerCase()
        .includes(searchLower) ||
      lecturer.email.toLowerCase().includes(searchLower) ||
      lecturer.telefon
        .toLowerCase()
        .includes(searchLower) ||
      lecturer.id_wykladowca.toString().includes(searchTerm)
    );
  });

  return (
    <div className="lecturers-container">
      <div className="lecturers-header">
        <h2>Zarzadzanie wykladowcami</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Szukaj wykladowców..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="scrollable-table">
          <table className="lecturers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Telefon</th>
                <th>Email</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredLecturers.map((lecturer) => (
                <tr key={lecturer.id_wykladowca}>
                  <td data-label="ID">
                    {lecturer.id_wykladowca}
                  </td>
                  <td data-label="Imie">{lecturer.imie}</td>
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
                        <i className="fas fa-edit"></i> Edit
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
