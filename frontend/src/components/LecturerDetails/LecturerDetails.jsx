import { useParams } from "react-router";
import React from "react";
import "./lecturerDetails.css";

const LecturerDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default LecturerDetails;
