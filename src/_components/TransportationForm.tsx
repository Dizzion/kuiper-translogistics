"use client";
import { RecordModel } from "pocketbase";
import React from "react";

interface TransportationFormProps {
  containers: RecordModel[];
  trackingNumbers: RecordModel[];
  sapTotes: RecordModel[];
}

const TransportationForm: React.FC<TransportationFormProps> = ({
  containers,
  trackingNumbers,
  sapTotes,
}) => {
  return <div>TransportationForm</div>;
};

export default TransportationForm;
