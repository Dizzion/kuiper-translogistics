"use client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import { TNCreate, TNDelete, TNGetByTN } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";

interface DeliveryFormProps {
  trackingNumbers: RecordModel[];
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ trackingNumbers }) => {
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [trackingNumberList, setTrackingNumberList] = useState<RecordModel[]>([]);

  const updateTrackingNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      enteredTrackingNumber === "" ||
      trackingNumberList.some(
        (obj) => obj.TrackingNumber === enteredTrackingNumber
      )
    ) {
      setEnteredTrackingNumber("");
      return;
    }
    const checker = await TNGetByTN(enteredTrackingNumber.trim());
    if (checker.totalItems > 0) {
      setShowAlert(true);
      return;
    }
    const timestamp = new Date();
    const aliasid = localStorage.getItem("id");
    const createRecord = {
      TrackingNumber: enteredTrackingNumber.trim(),
      Delivered: timestamp,
      aliasDeliv: aliasid as string,
    };
    const record = await TNCreate(createRecord);
    setTrackingNumberList([...trackingNumberList, record]);
    setEnteredTrackingNumber("");
  };

  const removeScannedTN = async (id: string) => {
    const updatedTNs = trackingNumberList.filter((obj) => obj.id !== id);
    setTrackingNumberList(updatedTNs);
    await TNDelete(id);
  }

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTrackingNumber("");
  }

  return (
    <>
      <Form onSubmit={updateTrackingNumber}>
        <Form.Label className="text-white">Tracking Number</Form.Label>
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          value={enteredTrackingNumber}
          onChange={(e) => setEnteredTrackingNumber(e.target.value)}
        />
      </Form>
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Duplicate Scan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered has already been entered
          please make sure you are not double scanning packages.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <TrackingNumberList trackingNumbersList={trackingNumberList} removeScannedTN={removeScannedTN}/>
    </>
  );
};

export default DeliveryForm;
