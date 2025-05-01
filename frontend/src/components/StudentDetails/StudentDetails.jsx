import { useParams } from "react-router";
import React from "react";
import "./studentDetails.css";

const StudentDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default StudentDetails;
