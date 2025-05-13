import { useParams } from "react-router";
import React from "react";
import "./courseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default CourseDetails;
