"use client";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import pb from "@/utils/pocketbase";

interface DeliveryFormProps {
  trackingNumbers: RecordModel[];
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  trackingNumbers,
}) => {
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [trackingNumberList, setTrackingNumberList] = useState<string[]>([]);

  const updateTrackingNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      trackingNumbers.some(
        (obj) => obj.TrackingNumber === enteredTrackingNumber
      ) ||
      enteredTrackingNumber === "" ||
      trackingNumberList.includes(enteredTrackingNumber)
    ) {
      setEnteredTrackingNumber("");
      return;
    }
    await createOnDelivered(enteredTrackingNumber);
    setTrackingNumberList([...trackingNumberList, enteredTrackingNumber]);
    setEnteredTrackingNumber("");
  };

  const createOnDelivered = async (enteredTrackingNumber: string) => {
    const timestamp = new Date().toLocaleString();
    try {
      await pb.collection("TrackingNumbers").create({
        TrackingNumber: enteredTrackingNumber,
        Delivered: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
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
