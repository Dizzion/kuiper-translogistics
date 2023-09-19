"use client";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TrackingNumberDashboard from "./TrackingNumberDashboard";
import { TNGetAll } from "@/utils/pocketbase";

export interface TrackingNumberData {
  outbound99: string;
  inbound133: string;
  delivered?: string;
  received133: string;
  outbound133: string;
  inbound99: string;
}

const SearchTrackingNumberCustomer: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [trackingNumbers, setTrackingNumbers] = useState<RecordModel[]>([]);
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [trackingNumberData, setTrackingNumberdata] =
    useState<TrackingNumberData>({
      outbound99: "",
      inbound133: "",
      delivered: "",
      received133: "",
      outbound133: "",
      inbound99: "",
    });

  async function getTNs() {
    const res = (await TNGetAll()) as RecordModel;
    setTrackingNumbers(res.items);
  }

  useEffect(() => {
    getTNs();
  }, []);

  const searchTrackingNumbers = (e: React.FormEvent) => {
    e.preventDefault();
    const existingTrackingNumberIndex = trackingNumbers.findIndex(
      (trackingNumber) =>
        trackingNumber.TrackingNumber === enteredTrackingNumber
    );
    if (existingTrackingNumberIndex !== -1) {
      setTrackingNumberdata({
        outbound99: new Date(trackingNumbers[existingTrackingNumberIndex].Outbound99).toLocaleString(),
        inbound133: new Date(trackingNumbers[existingTrackingNumberIndex].Inbound133).toLocaleString(),
        delivered: new Date(trackingNumbers[existingTrackingNumberIndex].Delivered).toLocaleString(),
        received133: new Date(trackingNumbers[existingTrackingNumberIndex].Received133).toLocaleString(),
        outbound133: new Date(trackingNumbers[existingTrackingNumberIndex].Outbound133).toLocaleString(),
        inbound99: new Date(trackingNumbers[existingTrackingNumberIndex].Inbound99).toLocaleString(),
      });
    } else {
      setTrackingNumberdata({
        outbound99: "",
        inbound133: "",
        delivered: "",
        received133: "",
        outbound133: "",
        inbound99: "",
      });
      setShowAlert(true);
    }
  };

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTrackingNumber("");
  }

  return (
    <>
      <Form onSubmit={searchTrackingNumbers}>
        <Form.Group>
          <Form.Label className="text-white">Tracking Number</Form.Label>
          <Form.Control
            type="trackingNumber"
            placeholder="Input Tracking Number Here!"
            value={enteredTrackingNumber}
            onChange={(e) => setEnteredTrackingNumber(e.target.value)}
          />
          <Form.Text className="text-white">
            Check to see where your package is at in the receiving process.
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="outline-light">
          Check your package!
        </Button>
      </Form>
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered has not been scanned into
          the system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <TrackingNumberDashboard trackingNumberData={trackingNumberData} />
    </>
  );
};

export default SearchTrackingNumberCustomer;
