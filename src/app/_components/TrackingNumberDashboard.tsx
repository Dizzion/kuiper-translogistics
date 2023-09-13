'use client'
import { RecordModel } from 'pocketbase';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import TrackingNumberDashboard from './SearchDashboard';

interface SearchProps {
    trackingNumbers: RecordModel[]
}

export interface TrackingNumberData {
    outbound99: string;
    inbound133: string;
    delivered?: string;
    received133: string;
    outbound133: string;
    inbound99: string;
}

const SearchTrackingNumberCustomer: React.FC<SearchProps> = ({ trackingNumbers }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [trackingNumberData, setTrackingNumberdata] = useState<TrackingNumberData>();

  const searchTrackingNumbers = (e: React.FormEvent) => {
    e.preventDefault();
    const existingTrackingNumberIndex = trackingNumbers.findIndex(
      (trackingNumber) => trackingNumber.TrackingNumber === enteredTrackingNumber
    );
    if (existingTrackingNumberIndex !== -1) {
        setTrackingNumberdata({
            outbound99: trackingNumbers[existingTrackingNumberIndex].Outbound99,
            inbound133: trackingNumbers[existingTrackingNumberIndex].Inbound133,
            delivered: trackingNumbers[existingTrackingNumberIndex].Delivered,
            received133: trackingNumbers[existingTrackingNumberIndex].Received133,
            outbound133: trackingNumbers[existingTrackingNumberIndex].Outbound133,
            inbound99: trackingNumbers[existingTrackingNumberIndex].Inbound99
        });
    } else {
      setShowAlert(true);
    }
    
  };

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTrackingNumber('');
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
        The tracking number that you have entered has not been scanned into the system.
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    <TrackingNumberDashboard trackingNumberData={trackingNumberData}/>
    </>
  );
};

export default SearchTrackingNumberCustomer;