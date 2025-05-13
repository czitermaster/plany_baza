import { useQuery } from "@tanstack/react-query";
import API from "../api/api";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await API.getCourses();
      return response.data;
    },
  });
}
