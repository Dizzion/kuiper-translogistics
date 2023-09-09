import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SearchProps } from "../utils/FormInterfaces";
import { TrackingNumber } from "../utils/DataFrame";
import TrackingNumberDashboard from "./subcomponents/TrackingNumberDashboard";

const SearchTrackingNumber: React.FC<SearchProps> = ({ trackingNumbers }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [trackingNumberData, setTrackingNumberdata] = useState<TrackingNumber>({
    id: "",
    timestamp1: "",
    timestamp2: "",
    timestamp3: "",
    timestamp4: "",
    timestamp5: "",
  });

  const searchTrackingNumbers = async (e: React.FormEvent) => {
    e.preventDefault();
    const existingTrackingNumberIndex = trackingNumbers.findIndex(
      (trackingNumber: TrackingNumber) => trackingNumber.id === enteredTrackingNumber
    );
    if (existingTrackingNumberIndex !== -1) {
      setTrackingNumberdata(trackingNumbers[existingTrackingNumberIndex]);
    } else {
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
        <Button type="submit">Check your package!</Button>
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

export default SearchTrackingNumber;