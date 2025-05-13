import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./plans.css";
import Button from "../Button/Button";
import { Link } from "react-router";

const LoadingPlans = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

const PlansListError = ({ error }) => {
  return <div>{error}</div>;
};

const Plans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] =
    useState("all");
  const qc = useQueryClient();

  const {
    data: plans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await API.getPlans();
      return response.data;
    },
  });

  const { mutate: deletePlan, isPending } = useMutation({
    mutationFn: async (id) => API.deletePlan(id),
    onSuccess: async () => {
      await qc.invalidateQueries(["Plans"]);
    },
  });

  if (isLoading) {
    return <LoadingPlans />;
  }

  if (error) {
    return <PlansListError error={error.message} />;
  }

  // Filter plans based on search term and category
  const filteredPlans = plans.filter((plan) => {
    const searchLower = searchTerm.toLowerCase();

    switch (searchCategory) {
      case "semester":
        return plan.semestr
          .toLowerCase()
          .includes(searchLower);
      case "year":
        return plan.rok_akademicki
          .toLowerCase()
          .includes(searchLower);
      case "id":
        return plan.id_plany_ksztalcenia
          .toString()
          .includes(searchTerm);
      default: // "all"
        return (
          plan.semestr
            .toLowerCase()
            .includes(searchLower) ||
          plan.rok_akademicki
            .toLowerCase()
            .includes(searchLower) ||
          plan.id_plany_ksztalcenia
            .toString()
            .includes(searchTerm)
        );
    }
  });

  return (
    <div className="plans-container">
      <div className="plans-header">
        <h2>Zarzadzanie planami</h2>
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
              <option value="semester">Semestr</option>
              <option value="year">Rok akademicki</option>
              <option value="id">ID planu</option>
            </select>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={
                  searchCategory === "all"
                    ? "Szukaj we wszystkich polach..."
                    : searchCategory === "semester"
                    ? "Szukaj po semestrze..."
                    : searchCategory === "year"
                    ? "Szukaj po roku akademickim..."
                    : "Szukaj po ID planu..."
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
          <table className="plans-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Semestr</th>
                <th>Rok akademicki</th>
                <th className="actions-column">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <tr key={plan.id_plany_ksztalcenia}>
                    <td data-label="ID">
                      {plan.id_plany_ksztalcenia}
                    </td>
                    <td data-label="Semestr">
                      {plan.semestr}
                    </td>
                    <td data-label="Rok akademicki">
                      {plan.rok_akademicki}
                    </td>
                    <td
                      data-label="Actions"
                      className="actions-cell"
                    >
                      <div className="action-buttons">
                        <Link
                          to={`/plany/${plan.id_plany_ksztalcenia}`}
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
                            deletePlan(
                              plan.id_plany_ksztalcenia
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

export default Plans;
