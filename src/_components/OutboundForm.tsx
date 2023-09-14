"use client";
import { TNCreate, TNUpdate } from "@/utils/pocketbase";
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
  const [stIds, setStIds] = useState<string[]>([]);
  const [tnIds, setTnIds] = useState<string[]>([]);
  const [enteredSapTotes, setEnteredSapTotes] = useState<RecordModel[]>([]);
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [showAlert, setShowAlert] = useState(false);
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [containerId, setContainerId] = useState("");

  function handleLocationChange(value: string): void {
    if (locationTag === "99" || locationTag === "133") {
      setContainerId(`SEA_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    }
    setLocationTag(value);
  }

  const changeTrackingNumberData = async (e: React.FormEvent) => {
    if (locationTag === "99" && !/^(SAP_)/.test(enteredTracking)) {
      const createRecord = {
        TrackingNumber: enteredTracking,
        Outbound99: new Date().toLocaleString(),
        alias: localStorage.getItem("id") as string,
      };
      const createdTn = await TNCreate(createRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, createdTn]);
      setTnIds([...tnIds, createdTn.id]);
    } else if (locationTag === "133" && !/^(SAP_)/.test(enteredTracking)) {
        const tnIndex = trackingNumbers.findIndex((obj) => obj.TrackingNumber === enteredTracking);
        const updateRecord = {
            TrackingNumber: trackingNumbers[tnIndex].TrackingNumber,
            Outbound133: new Date().toLocaleString(),
            alias: localStorage.getItem("id") as string
        }
        const updatedTn = await TNUpdate(trackingNumbers[tnIndex].id, updateRecord);
        setEnteredTrackingNumbers([...enteredTrackingNumbers, updatedTn]);
        setTnIds([...tnIds, updatedTn.id]);
    } else if (locationTag === "99" && /^(SAP_)/.test(enteredTracking)) {
        //Empty Tote
    }
  };

  return <div>OutboundForm</div>;
};

export default OutboundForm;
