import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Students from "./components/Students/Students";
import Plans from "./components/Plans/Plans";
import Subjects from "./components/Subjects/Subjects";
import Courses from "./components/Courses/Courses";
import Lecturers from "./components/Lecturers/Lecturers";
import Dashboard from "./components/Dashboard/Dashboard";
import "./styles/main.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import PlanDetails from "./components/PlanDetails/PlanDetails";
import SubjectDetails from "./components/SubjectDetails/SubjectDetails";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import LecturerDetails from "./components/LecturerDetails/LecturerDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <Header />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/studenci"
                  element={<Students />}
                />
                <Route path="/plany" element={<Plans />} />
                <Route
                  path="/przedmioty"
                  element={<Subjects />}
                />
                <Route
                  path="/kierunki"
                  element={<Courses />}
                />
                <Route
                  path="/wykladowcy"
                  element={<Lecturers />}
                />
                <Route
                  path="/studenci/:id"
                  element={<StudentDetails />}
                />
                <Route
                  path="/plany/:id"
                  element={<PlanDetails />}
                />
                <Route
                  path="/przedmioty/:id"
                  element={<SubjectDetails />}
                />
                <Route
                  path="/kierunki/:id"
                  element={<CourseDetails />}
                />
                <Route
                  path="/wykladowcy/:id"
                  element={<LecturerDetails />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
