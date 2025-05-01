// import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api";

// const api = {
//   // Studenci
//   getStudents: () => axios.get(`${API_BASE_URL}/students`),
//   createStudent: (studentData) =>
//     axios.post(`${API_BASE_URL}/students`, studentData),

//   // Plany
//   getPlans: () => axios.get(`${API_BASE_URL}/plans`),

//   // Przedmioty
//   getSubjects: () => axios.get(`${API_BASE_URL}/subjects`),

//   // Kierunki
//   getCourses: () => axios.get(`${API_BASE_URL}/courses`),

//   // Wykładowcy
//   getLecturers: () =>
//     axios.get(`${API_BASE_URL}/lecturers`),
// };

// export default api;

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
};

export default apiService;
