"use client";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TrackingNumberDashboard from "./TrackingNumberDashboard";
import { TNGetByTN } from "@/utils/pocketbase";

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
  const [sap, setSap] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<
    RecordModel | undefined
  >();
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [variant, setVariant] = useState<string[]>([
    "dark",
    "dark",
    "dark",
    "dark",
    "dark",
  ]);
  const [elapsedTime, setElapsedTime] = useState("");
  const [trackingNumberData, setTrackingNumberData] =
    useState<TrackingNumberData>({
      outbound99: "",
      inbound133: "",
      delivered: "",
      received133: "",
      outbound133: "",
      inbound99: "",
    });

  async function getTN() {
    const res = await TNGetByTN(enteredTrackingNumber);
    if (res.items.length > 0) {
      setTrackingNumber(res.items[0]);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }

  function calculateTime(timestamp: Date | undefined | null): string {
    if (typeof timestamp === "undefined" || timestamp === null) return "";
    let calculation: string = "";
    let timeDifference: number = 0;
    const currentTime = new Date();
    timeDifference = Math.abs(timestamp.getTime() - currentTime.getTime());
    const days = Math.floor(timeDifference / 86400000); // 1 day = 86400000 milliseconds
    const hours = Math.floor((timeDifference % 86400000) / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
    if (days > 0) {
      calculation += `${days} day${days > 1 ? "s" : ""} `;
    }
    if (hours > 0) {
      calculation += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      calculation += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }
    return calculation;
  }

  const getTimestamp = (timestampData: string | undefined) => {
    if (typeof timestampData === "undefined") return null;
    return timestampData !== "" ? new Date(timestampData) : null;
  };

  const updateVariant = (
    currentVariants: string[],
    timestamps: (Date | null)[],
    delivered: Date | null
  ) => {
    if (
      delivered !== undefined &&
      delivered !== null &&
      isNaN(delivered.getTime()) !== true
    ) {
      const deliveredVariant = ["secondary", "secondary", "info"];
      currentVariants.splice(0, deliveredVariant.length, ...deliveredVariant);
      setElapsedTime(calculateTime(delivered));
    }
    if (timestamps[0] === null && timestamps[1] === null && timestamps[2]) {
      [currentVariants[0], currentVariants[1]] = ["secondary", "secondary"];
    }
    timestamps.forEach((timestamp, i) => {
      if (
        timestamp !== undefined &&
        timestamp !== null &&
        isNaN(timestamp.getTime()) !== true
      ) {
        currentVariants[i] = "success";
        currentVariants[i + 1] = "info";
        setElapsedTime(calculateTime(timestamp));
      }
    });
    if (trackingNumber) {
      if(trackingNumber.SAP === "Yes") {
        [currentVariants[3], currentVariants[4]] = ["dark", "dark"];
        setSap(true);
      }
    }

    return currentVariants;
  };

  const calculateVariant = (timestampData: string | undefined) => {
    const variant = ["dark", "dark", "dark", "dark", "dark"];
    if (timestampData === "" || typeof timestampData === "undefined")
      return variant;

    let lastSuccessIndex = -1;

    for (let i = 0; i < variant.length; i++) {
      if (variant[i] === "success") {
        lastSuccessIndex = i;
      }
    }

    if (lastSuccessIndex >= 0) {
      for (let i = lastSuccessIndex + 1; i < variant.length; i++) {
        variant[i] = "info";
      }
    } else {
      variant.fill("success", 0, 1);
      variant.fill("info", 1, 2);
    }

    return variant;
  };

  useEffect(() => {
    async function fetchData() {
      if (trackingNumber !== undefined) {
        setTrackingNumberData({
          outbound99: new Date(trackingNumber.Outbound99).toLocaleString(),
          inbound133: new Date(trackingNumber.Inbound133).toLocaleString(),
          delivered: new Date(trackingNumber.Delivered).toLocaleString(),
          received133: new Date(trackingNumber.Received133).toLocaleString(),
          outbound133: new Date(trackingNumber.Outbound133).toLocaleString(),
          inbound99: new Date(trackingNumber.Inbound99).toLocaleString(),
        });
      } else {
        setSap(false);
        setTrackingNumberData({
          outbound99: "",
          inbound133: "",
          delivered: "",
          received133: "",
          outbound133: "",
          inbound99: "",
        });
      }
    }

    fetchData();
  }, [trackingNumber]);

  useEffect(() => {
    if (
      trackingNumberData.outbound99 &&
      trackingNumberData.inbound133 &&
      trackingNumberData.delivered &&
      trackingNumberData.received133 &&
      trackingNumberData.outbound133 &&
      trackingNumberData.inbound99
    ) {
      const outbound99 = getTimestamp(trackingNumberData.outbound99);
      const inbound133 = getTimestamp(trackingNumberData.inbound133);
      const delivered = getTimestamp(trackingNumberData.delivered);
      const received133 = getTimestamp(trackingNumberData.received133);
      const outbound133 = getTimestamp(trackingNumberData.outbound133);
      const inbound99 = getTimestamp(trackingNumberData.inbound99);

      const variants = calculateVariant(trackingNumberData.outbound99);
      setVariant(
        updateVariant(
          variants,
          [outbound99, inbound133, received133, outbound133, inbound99],
          delivered
        )
      );
      setElapsedTime(calculateTime(delivered));
    } else {
      setVariant(["dark", "dark", "dark", "dark", "dark"]);
      setElapsedTime("");
    }
  }, [trackingNumberData]);

  const searchTrackingNumbers = async (e: React.FormEvent) => {
    e.preventDefault();
    await getTN();
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
      <TrackingNumberDashboard
        trackingNumberData={trackingNumberData}
        variant={variant}
        elapsedTime={elapsedTime}
        sap={sap}
      />
    </>
  );
};

export default SearchTrackingNumberCustomer;
