"use client";
import { ContCreate, TNCreate, TNUpdate } from "@/utils/pocketbase";
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
  const [emptyTotes, setEmptyTotes] = useState<string[]>([]);
  const [from99To133, setFrom99To133] = useState(false);
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [showAlert, setShowAlert] = useState(false);
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [containerId, setContainerId] = useState("");
  const [startTime, setStartTime] = useState(new Date());

  function handleLocationChange(value: string): void {
    if (locationTag === "99" || locationTag === "133") {
      setContainerId(`SEA_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    }
    setLocationTag(value);
  }

  const changeTrackingNumberData = async (e: React.FormEvent) => {
    if ((emptyTotes.length === 0) && (stIds.length === 0) && (tnIds.length === 0)) {
        setStartTime(new Date());
    }
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
        setFrom99To133(true);
        setEmptyTotes([...emptyTotes, enteredTracking]);
    } else if (locationTag === "133" && /^(SAP_)/.test(enteredTracking)) {
        const stIndex = sapTotes.findIndex((obj) => obj.ToteID === enteredTracking);
        setStIds([...stIds, sapTotes[stIndex].id]);
        setEnteredSapTotes([...enteredSapTotes, sapTotes[stIndex]]);
    } else {
        setShowAlert(true);
    }
  };

  const submitContainer = async (e: React.FormEvent) => {
    const enteredContainer = {
        ContainerID: containerId,
        StartTime: startTime,
        StagedTime: new Date(),
        TrackingNumbers: tnIds,
        SapTotes: stIds,
        alias: localStorage.getItem("id") as string
    }
    await ContCreate(enteredContainer);
    setContainerId('');
    setLocationTag('');
    setStIds([]);
    setTnIds([]);
    setEnteredTrackingNumbers([]);
    setFrom99To133(false);
    setEmptyTotes([]);
    setEnteredSapTotes([]);
  }

  return <div>OutboundForm</div>;
};

export default OutboundForm;
