import { useParams } from "react-router";
import React from "react";
import "./planDetails.css";

const PlanDetails = () => {
  const { id } = useParams();
  return <div>To jest plan nr {id}</div>;
};

export default PlanDetails;
