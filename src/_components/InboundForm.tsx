"use client";
import { ContUpdate, STUpdate, TNUpdate } from "@/utils/pocketbase";
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
  const [showAlert, setShowAlert] = useState(false);
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
      setWorkingCont(containers[contindex]);
      console.log(workingCont);
      setDisabledEntry(false);
      if (workingCont !== undefined) {
        const res = await fetch(
          `http://127.0.0.1:8090/api/collections/Containers/records/${workingCont.id}?expand=TrackingNumbers,SapTotes`,
          { cache: "no-store" }
        );
        const cont = await res.json();
        console.log(cont);
        if (cont.expand) {
          setEnteredSapTotes(cont.expand.SapTotes);
          console.log(enteredSapTotes);
          setEnteredTrackingNumbers(cont.expand.TrackingNumbers);
          console.log(enteredTrackingNumbers);
        }
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
        const recordid = enteredTrackingNumbers[isInETN].id;
        await TNUpdate(recordid, record);
        setEnteredTrackingNumbers(enteredTrackingNumbers.splice(isInETN, 1));
        setEnteredTracking("");
      }
    }
    if (isInEST !== -1) {
      const recordid = enteredSapTotes[isInEST].id;
      await STUpdate(recordid, timestamp);
      setEnteredTracking("");
      setEnteredSapTotes(enteredSapTotes.splice(isInEST, 1));
    } else {
      setShowAlert(true);
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

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTracking("");
  }

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
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Info Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking info that you have entered has an error please make sure
          you are scanning the correct code.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InboundForm;
