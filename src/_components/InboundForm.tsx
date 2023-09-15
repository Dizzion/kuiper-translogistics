"use client";
import { ContGetOne, ContUpdate, STUpdate, TNUpdate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form, Button, ListGroup, Modal } from "react-bootstrap";
import DisplaySapTote from "./SapToteDisplay";
import TrackingNumberList from "./TrackingNumberList";

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
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [enteredSapTotes, setEnteredSapTotes] = useState<RecordModel[]>([]);

  const containerIdChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const contindex = containers.findIndex(
      (cont) => cont.ContainerID === enteredContId
    );
    if (contindex !== -1) {
      setDisabledEntry(false);
      const cont = await ContGetOne(containers[contindex].id);
      setWorkingCont(cont);
      if (cont.expand) {
        setEnteredSapTotes(cont.expand.SapTotes || []);
        setEnteredTrackingNumbers(cont.expand.TrackingNumbers || []);
      }
      return;
    }
    setDisabledEntry(true);
    setEnteredTrackingNumbers([]);
    setEnteredSapTotes([]);
    setWorkingCont({} as RecordModel);
  };

  const changeTrackingNumberData = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date();
    const isInETN = enteredTrackingNumbers.findIndex(
      (obj) => obj.TrackingNumber === enteredTracking
    );
    const isInEST = enteredSapTotes.findIndex(
      (obj) => obj.ToteID === enteredTracking
    );
    if (isInETN !== -1) {
      const updatedEnteredTrackingNumbers = [...enteredTrackingNumbers];
      if (locationTag === "99") {
        const record = {
          TrackingNumber: enteredTrackingNumbers[isInETN].TrackingNumber,
          Inbound99: timestamp.toLocaleString(),
          alias: localStorage.getItem("id") as string,
        };
        updatedEnteredTrackingNumbers.splice(isInETN, 1);
        setEnteredTrackingNumbers(updatedEnteredTrackingNumbers);
        await TNUpdate(enteredTrackingNumbers[isInETN].id, record);
        setEnteredTracking("");
      } else if (locationTag === "133") {
        const record = {
          TrackingNumber: enteredTrackingNumbers[isInETN].TrackingNumber,
          Inbound133: timestamp.toLocaleString(),
          alias: localStorage.getItem("id") as string,
        };
        const recordid = enteredTrackingNumbers[isInETN].id;
        await TNUpdate(recordid, record);
        updatedEnteredTrackingNumbers.splice(isInETN, 1);
        setEnteredTrackingNumbers(updatedEnteredTrackingNumbers);
        setEnteredTracking("");
      }
    }
    if (isInEST !== -1) {
      const updatedEnteredSapTotes = [...enteredSapTotes];
      const recordid = enteredSapTotes[isInEST].id;
      await STUpdate(recordid, timestamp);
      setEnteredTracking("");
      updatedEnteredSapTotes.splice(isInEST, 1);
      setEnteredSapTotes(updatedEnteredSapTotes);
    } 
  };

  const submitContainer = async () => {
    const timestamp = new Date();
    if (workingCont !== undefined) {
      await ContUpdate(workingCont.id, timestamp);
    }
    setDisabledEntry(true);
    setEnteredContId("");
    setEnteredSapTotes([]);
    setEnteredTracking("");
    setEnteredTrackingNumbers([]);
    setLocationTag("");
    setWorkingCont({} as RecordModel);
  };

  return (
    <>
      <Form onSubmit={containerIdChange}>
        <Form.Group className="text-center">
          <Form.Label className="text-white">Location</Form.Label>
          <Form.Select
            size="lg"
            placeholder="99 or 133?"
            required
            value={locationTag}
            onChange={(e) => setLocationTag(e.target.value)}
          >
            <option>Select Your Location</option>
            <option value="99">SEA99</option>
            <option value="133">SEA133</option>
          </Form.Select>
          <Form.Label className="text-white">Container ID</Form.Label>
          <Form.Control
            type="containterID"
            size="lg"
            required
            placeholder="Which Container are you loading?"
            value={enteredContId}
            onChange={(e) => setEnteredContId(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button variant="outline-light" type="button" onClick={submitContainer}>
        Submit Container
      </Button>
      <Form onSubmit={changeTrackingNumberData} className="text-center">
        <Form.Label className="text-white">Tracking Number</Form.Label>
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          value={enteredTracking}
          disabled={disabledEntry}
          onChange={(e) => setEnteredTracking(e.target.value)}
        />
      </Form>
      <ListGroup>
        {enteredSapTotes.map((SapTote) => (
          <ListGroup.Item variant="dark" key={SapTote.id}>
            <DisplaySapTote SapTote={SapTote} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <TrackingNumberList trackingNumbersList={enteredTrackingNumbers} />
    </>
  );
};

export default InboundForm;
