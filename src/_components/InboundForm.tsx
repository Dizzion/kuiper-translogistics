"use client";
import { TNUpdate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";

interface InboundFormProps {
  containers: RecordModel[];
  trackingNumbers: RecordModel[];
  sapTotes: RecordModel[];
}

const InboundForm: React.FC<InboundFormProps> = ({
  containers,
  trackingNumbers,
  sapTotes,
}) => {
  const [enteredContId, setEnteredContId] = useState("");
  const [workingCont, setWorkingCont] = useState<RecordModel>();
  const [disabledEntry, setDisabledEntry] = useState(true);
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [enteredSapTotes, setEnteredSapTotes] = useState<RecordModel[]>([]);

  const containerIdChange = (value: string) => {
    setEnteredContId(value);
    const contindex = containers.findIndex(
      (cont) => cont.ContainerID === enteredContId
    );
    if (contindex === -1) {
      return;
    }
    setWorkingCont(containers[contindex]);
    setDisabledEntry(false);
    if (workingCont !== undefined) {
      workingCont.TrackingNumbers.forEach((tn: string) => {
        const index = trackingNumbers.findIndex(
          (itn) => itn.TrackingNumber === tn
        );
        setEnteredTrackingNumbers([
          ...enteredTrackingNumbers,
          trackingNumbers[index],
        ]);
      });
      workingCont.SapTotes.forEach((st: string) => {
        const index = sapTotes.findIndex((ist) => ist.ToteID === st);
        setEnteredSapTotes([...enteredTrackingNumbers, sapTotes[index]]);
      });
    }
  };
  const changeTrackingNumberData = async (e: React.FormEvent) => {
    const timestamp = new Date();
    const isInETN = enteredTrackingNumbers.findIndex(
      (obj) => obj.TrackingNumber === enteredTracking
    );
    const isInEST = enteredSapTotes.findIndex(
      (obj) => obj.ToteID === enteredTracking
    );
    if (isInETN !== -1) {
      if (locationTag === "99") {
        const record = {
          TrackingNumber: enteredTrackingNumbers[isInETN].TrackingNumber,
          Inbound99: timestamp.toLocaleString(),
          alias: localStorage.getItem("id") as string,
        };
        setEnteredTrackingNumbers(enteredTrackingNumbers.splice(isInETN, 1));
        await TNUpdate(enteredTrackingNumbers[isInETN].id, record);
        setEnteredTracking("");
      } else if (locationTag === "133") {
        const record = {
          TrackingNumber: enteredTrackingNumbers[isInETN].TrackingNumber,
          Inbound133: timestamp.toLocaleString(),
          alias: localStorage.getItem("id") as string,
        };
        setEnteredTrackingNumbers(enteredTrackingNumbers.splice(isInETN, 1));
        await TNUpdate(enteredTrackingNumbers[isInETN].id, record);
        setEnteredTracking("");
      }
    }
  };
  return <></>;
};

export default InboundForm;
