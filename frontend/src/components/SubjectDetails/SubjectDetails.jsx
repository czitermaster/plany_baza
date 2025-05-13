import { useParams } from "react-router";
import React from "react";
import "./subjectDetails.css";

const SubjectDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default SubjectDetails;
