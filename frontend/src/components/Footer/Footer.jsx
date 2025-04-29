import React from "react";
import logo from "../../assets/images/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo uczelni" />
        </div>
        <div className="footer-info">
          <h3>Uniwersytet Example</h3>
          <p>ul. Akademicka 123, 00-000 Miasto</p>
          <p>
            Tel: +48 123 456 789 | Email:
            kontakt@example.edu.pl
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} System Plany
        Kształcenia
      </div>
    </footer>
  );
};

export default Footer;
