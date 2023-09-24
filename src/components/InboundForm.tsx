"use client";
import {
  ContGetByContId,
  ContUpdate,
  STUpdate,
  TNUpdate,
} from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import DisplaySapTote from "./SapToteDisplay";
import ContTNList from "./ContTNList";

interface InboundFormProps {
  containers: RecordModel[];
}

const InboundForm: React.FC<InboundFormProps> = ({ containers }) => {
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
    const cont = await ContGetByContId(enteredContId);
    if (cont.items[0]) {
      setDisabledEntry(false);
      setWorkingCont(cont.items[0]);
      if (cont.items[0].expand) {
        setEnteredSapTotes(cont.items[0].expand.SapTotes || []);
        setEnteredTrackingNumbers(cont.items[0].expand.TrackingNumbers || []);
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
          Inbound99: timestamp,
          aliasIn99: localStorage.getItem("id") as string,
        };
        updatedEnteredTrackingNumbers.splice(isInETN, 1);
        setEnteredTrackingNumbers(updatedEnteredTrackingNumbers);
        await TNUpdate(enteredTrackingNumbers[isInETN].id, record);
        setEnteredTracking("");
      } else if (locationTag === "133") {
        const record = {
          TrackingNumber: enteredTrackingNumbers[isInETN].TrackingNumber,
          Inbound133: timestamp,
          aliasIn133: localStorage.getItem("id") as string,
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
      await STUpdate(enteredSapTotes[isInEST].id, timestamp);
      setEnteredTracking("");
      updatedEnteredSapTotes.splice(isInEST, 1);
      setEnteredSapTotes(updatedEnteredSapTotes);
    }
    setEnteredTracking("");
  };

  const submitContainer = async () => {
    const timestamp = new Date();
    const cont = workingCont;
    if (cont) {
      await ContUpdate(cont.id, timestamp);
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
        <Form.Group>
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
      <Button
        style={{ marginTop: "5px", marginBottom: "15px" }}
        variant="outline-light"
        type="button"
        onClick={submitContainer}
      >
        Submit Container
      </Button>
      <Form onSubmit={changeTrackingNumberData} className="text-center">
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
      <ContTNList trackingNumbersList={enteredTrackingNumbers} />
    </>
  );
};

export default InboundForm;
