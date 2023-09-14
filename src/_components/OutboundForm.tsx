"use client";
import { ContCreate, TNCreate, TNUpdate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";

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

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTracking("");
  }

  return (
    <>
      <Form>
        <Form.Group className="text-center">
          <Form.Label className="text-white">Location</Form.Label>
          <Form.Control
            type="location"
            size="lg"
            placeholder="99 or 133?"
            required
            value={locationTag}
            onChange={(e) => handleLocationChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <Form.Label className="text-white">Container ID</Form.Label>
          <Form.Control
            type="containterID"
            size="lg"
            placeholder="Which Container are you loading?"
            disabled
            value={containerId}
          />
        </Form.Group>

        <Button variant="outline-light" type="button" onClick={submitContainer}>
          Submit Container
        </Button>
      </Form>
      <Form onSubmit={changeTrackingNumberData} className="text-center">
        <Form.Label className="text-white">Tracking Number</Form.Label>
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          value={enteredTracking}
          onChange={(e) => setEnteredTracking(e.target.value)}
        />
      </Form>
      {from99To133 ? (
        <></>
      ): (
        <></>
      )}
      <TrackingNumberList trackingNumbersList={enteredTrackingNumbers} />
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered has an error please make sure you are 
          scanning the correct code.
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

export default OutboundForm;
