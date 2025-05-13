import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../../api/api";
import "./courses.css";
import Button from "../Button/Button";
import { Link } from "react-router";

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
  const qc = useQueryClient();
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await API.getCourses();
      return response.data;
    },
  });

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

  return (
    <div className="courses-container">
      <h2> Zarzadzanie kierunkami </h2>

      <table className="courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa kierunku</th>
            <th>Poziom studiow</th>
            <th className="actions-column">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id_kierunek}>
              <td data-label="ID">{course.id_kierunek}</td>
              <td data-label="Nazwa kierunku">
                {course.nazwa_kierunku}
              </td>
              <td data-label="Poziom studiow">
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
                      deleteCourse(course.id_kierunek)
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

export default Courses;
