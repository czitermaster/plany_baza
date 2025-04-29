import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Podsumowanie</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Studenci</h3>
          <p className="stat-value">1,245</p>
        </div>
        <div className="stat-card">
          <h3>Wykładowcy</h3>
          <p className="stat-value">87</p>
        </div>
        <div className="stat-card">
          <h3>Przedmioty</h3>
          <p className="stat-value">156</p>
        </div>
        <div className="stat-card">
          <h3>Kierunki</h3>
          <p className="stat-value">12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
