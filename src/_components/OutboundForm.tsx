"use client";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";

interface OutboundFormProps {
  sapTotes: RecordModel[];
  trackingNumbers: RecordModel[];
}

const OutboundForm: React.FC<OutboundFormProps> = ({
  sapTotes,
  trackingNumbers,
}) => {
  const [enteredSapTotes, setEnteredSapTotes] = useState([]);
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState([]);
  const [showAlert, setshowAlert] = useState(false);
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [containerId, setContainerId] = useState("");

  function handleLocationChange(value: string): void {
    if (locationTag === "") {
      setContainerId(`SEA_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    }
    setLocationTag(value);
  }

  return <div>OutboundForm</div>;
};

export default OutboundForm;
