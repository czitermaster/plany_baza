import API from "../../api/api";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { useCourses } from "../../hooks/useCourses";
import { useMutation } from "@tanstack/react-query";
import "./studentAdd.css"; // <--- import stylów

export function StudentAdd() {
  const { register, handleSubmit } = useForm();
  const query = useCourses();

  const { mutate: addStudent } = useMutation({
    mutationFn: async (user) => API.createStudent(user),
    onSuccess: async () => {
      // Możesz dodać np. przekierowanie lub komunikat sukcesu
    },
  });

  function onSubmit(data) {
    const user = {
      ...data,
      id_kierunek: Number(data.id_kierunek),
      rok_studiow: Number(data.rok_studiow),
    };
    addStudent(user);
  }

  return (
    <div className="student-add-container">
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          placeholder="Kierunek"
          {...register("id_kierunek")}
        >
          {query.data?.map((course) => (
            <option
              key={course.id_kierunek}
              value={course.id_kierunek}
            >
              {course.nazwa_kierunku}{" "}
              {course.poziom_studiow}
            </option>
          ))}
        </select>

        <input placeholder="Imię" {...register("imie")} />
        <input
          placeholder="Nazwisko"
          {...register("nazwisko")}
        />
        <input placeholder="PESEL" {...register("pesel")} />
        <input
          placeholder="Telefon"
          {...register("telefon")}
        />
        <input
          type="number"
          placeholder="Rok studiów"
          {...register("rok_studiow")}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
