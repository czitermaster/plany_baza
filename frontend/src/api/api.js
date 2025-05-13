import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiService = {
  getStudents: () => API.get("/studenci"),
  createStudent: () => API.post("/studeci"),
  updateStudent: (id) => API.put(`/studenci/${id}`),
  deleteStudent: (id) => API.delete(`/studenci/${id}`),

  getPlans: () => API.get("/plany"),
  createPlan: () => API.post("/plany"),
  updatePlan: (id) => API.put(`/plany/${id}`),
  deletePlan: (id) => API.delete(`/plany/${id}`),

  getSubjects: () => API.get("/przedmioty"),
  createSubject: () => API.post("/przedmioty"),
  updateSubject: (id) => API.put(`/przedmioty/${id}`),
  deleteSubject: (id) => API.delete(`/przedmioty/${id}`),

  getCourses: () => API.get("/kierunki"),
  createCourse: () => API.post("/kierunki"),
  updateCourse: (id) => API.put(`/kierunki/${id}`),
  deleteCourse: (id) => API.delete(`/kierunki/${id}`),

  getLecturers: () => API.get("/wykladowcy"),
  createLecturer: () => API.post("/wykladowcy"),
  updateLecturer: (id) => API.put(`/wykladowcy/${id}`),
  deleteLecturer: (id) => API.delete(`/wykladowcy/${id}`),
};

export default apiService;
