import React from "react";
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

  return (
    <div className="plans-container">
      <h2> Zarzadzanie planami </h2>

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
              {plans.map((plan) => (
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
                        <i className="fas fa-edit"></i> Edit
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Plans;
