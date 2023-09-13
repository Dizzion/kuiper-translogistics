"use client";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";

interface DeliveryFormProps {
  trackingNumbers: RecordModel[];
  createOnDelivered: (enteredTrackingNumber: string) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  trackingNumbers,
  createOnDelivered,
}) => {
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [trackingNumberList, setTrackingNumberList] = useState<string[]>([]);

  const updateTrackingNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      trackingNumbers.some(
        (obj) => obj.TrackingNumber === enteredTrackingNumber
      ) ||
      enteredTrackingNumber === ""
    ) {
      setEnteredTrackingNumber("");
      return;
    }
    createOnDelivered(enteredTrackingNumber);
    setTrackingNumberList([...trackingNumberList, enteredTrackingNumber]);
    setEnteredTrackingNumber("");
  };

  return (
    <>
      <Form onSubmit={updateTrackingNumber} className="text-center">
        <Form.Label className="text-white">Tracking Number</Form.Label>
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          value={enteredTrackingNumber}
          onChange={(e) => setEnteredTrackingNumber(e.target.value)}
        />
      </Form>
      <TrackingNumberList trackingNumbersList={trackingNumberList} />
    </>
  );
};

export default DeliveryForm;
