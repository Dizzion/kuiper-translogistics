import React, { useEffect, useState } from "react";
import { TrackingNumber } from "../../utils/DataFrame";
import { Card, CardGroup } from "react-bootstrap";
import { CardFooter } from "./CardFooter";
import { CardText } from "./CardText";

interface TrackingNumberDashboardProps {
  trackingNumberData: TrackingNumber;
}

const TrackingNumberDashboard: React.FC<TrackingNumberDashboardProps> = ({
  trackingNumberData,
}) => {
  const [variant, setVariant] = useState<string[]>([
    "dark",
    "dark",
    "dark",
    "dark",
    "dark",
  ]);
  const [elapsedTime, setElapsedTime] = useState("");

  function calculateTime(timestamp: Date | undefined): string {
    if (typeof timestamp === "undefined") return "";
    let calculation: string = "";
    let timeDifference: number = 0;
    const currentTime = new Date();
    timeDifference = Math.abs(timestamp.getTime() - currentTime.getTime());
    // Calculate hours, minutes, and seconds from the time difference
    const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
    if (hours > 0) {
      calculation += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      calculation += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }
    return calculation;
  }

  const getTimestamp = (timestampData: string | undefined) => {
    if (typeof timestampData === "undefined") return;
    return timestampData !== "" ? new Date(timestampData) : null;
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

  const updateVariant = (
    variants: string[],
    timestamp1: Date | null,
    timestamp2: Date | null,
    timestamp3: Date | null,
    timestamp4: Date | null,
    timestamp5: Date | null
  ) => {
    if (timestamp1 !== null) {
      setElapsedTime(calculateTime(timestamp1));
    }
    if (timestamp2 !== null) {
      variants[1] = "success";
      variants[2] = "info";
      setElapsedTime(calculateTime(timestamp2));
    }
    if (timestamp3 !== null) {
      if (timestamp1 === null && timestamp2 === null) {
        variants[0] = "secondary";
        variants[1] = "secondary";
      }
      variants[2] = "success";
      variants[3] = "info";
      setElapsedTime(calculateTime(timestamp3));
    }
    if (timestamp4 !== null) {
      if (timestamp1 === null && timestamp2 === null) {
        variants[0] = "secondary";
        variants[1] = "secondary";
      }
      variants[3] = "success";
      variants[4] = "info";
      setElapsedTime(calculateTime(timestamp4));
    }
    if (timestamp5 !== null) {
      if (timestamp1 === null && timestamp2 === null) {
        variants[0] = "secondary";
        variants[1] = "secondary";
      }
      variants[4] = "success";
      setElapsedTime(calculateTime(timestamp5));
    }
    return variants;
  };

  const updatePulse = (variantClass: string): string => {
    let className: string = "";
    if (variantClass === "info") {
      className = "pulsate";
    }
    return className;
  };

  useEffect(() => {
    if (
      !trackingNumberData ||
      typeof trackingNumberData.timestamp1 === "undefined"
    ) {
      return; // Exit the effect early if timestamp1 is undefined
    }
    const timestamp1 = getTimestamp(trackingNumberData.timestamp1);
    const timestamp2 = getTimestamp(trackingNumberData.timestamp2);
    const timestamp3 = getTimestamp(trackingNumberData.timestamp3);
    const timestamp4 = getTimestamp(trackingNumberData.timestamp4);
    const timestamp5 = getTimestamp(trackingNumberData.timestamp5);

    const variants = calculateVariant(trackingNumberData.timestamp1);
    if (
      typeof timestamp1 !== "undefined" &&
      typeof timestamp2 !== "undefined" &&
      typeof timestamp3 !== "undefined" &&
      typeof timestamp4 !== "undefined" &&
      typeof timestamp5 !== "undefined"
    ) {
      setVariant(
        updateVariant(
          variants,
          timestamp1,
          timestamp2,
          timestamp3,
          timestamp4,
          timestamp5
        )
      );
    } else {
      setVariant(variants);
    }
  }, [trackingNumberData]);

  return (
    <CardGroup className="mt-3">
      <Card bg={variant[0]} text="white" className={updatePulse(variant[0])}>
        <Card.Img
          variant="top"
          src="/Processing.png"
          style={{
            objectFit: "none",
            backgroundColor: "white",
            marginTop: "0px",
            height: "180px",
            textAlign: "center",
          }}
        />
        <Card.Body>
          <Card.Title>Incoming Processing</Card.Title>
          <CardText
            variant={variant[0]}
            timestamp={trackingNumberData.timestamp1}
          />
        </Card.Body>
        <CardFooter variant={variant[0]} elapsedTime={elapsedTime} />
      </Card>
      <Card bg={variant[1]} text="white" className={updatePulse(variant[1])}>
        <Card.Img
          variant="top"
          src="/Truck.png"
          style={{
            objectFit: "none",
            backgroundColor: "white",
            marginTop: "0px",
            height: "180px",
            textAlign: "center",
          }}
        />
        <Card.Body>
          <Card.Title>Transit to Receipt Team</Card.Title>
          <CardText
            variant={variant[1]}
            timestamp={trackingNumberData.timestamp2}
          />
        </Card.Body>
        <CardFooter variant={variant[1]} elapsedTime={elapsedTime} />
      </Card>
      <Card bg={variant[2]} text="white" className={updatePulse(variant[2])}>
        <Card.Img
          variant="top"
          src="/Gears.png"
          style={{
            objectFit: "none",
            backgroundColor: "white",
            marginTop: "0px",
            height: "180px",
            textAlign: "center",
          }}
        />
        <Card.Body>
          <Card.Title>Receipt Processing</Card.Title>
          <CardText
            variant={variant[2]}
            timestamp={trackingNumberData.timestamp3}
          />
        </Card.Body>
        <CardFooter variant={variant[2]} elapsedTime={elapsedTime} />
      </Card>
      <Card bg={variant[3]} text="white" className={updatePulse(variant[3])}>
        <Card.Img
          variant="top"
          src="/Truck.png"
          style={{
            objectFit: "none",
            backgroundColor: "white",
            marginTop: "0px",
            height: "180px",
            textAlign: "center",
          }}
        />
        <Card.Body>
          <Card.Title>Transit to Pickup</Card.Title>
          <CardText
            variant={variant[3]}
            timestamp={trackingNumberData.timestamp4}
          />
        </Card.Body>
        <CardFooter variant={variant[3]} elapsedTime={elapsedTime} />
      </Card>
      <Card bg={variant[4]} text="white" className={updatePulse(variant[4])}>
        <Card.Img
          variant="top"
          src="/Flag.png"
          style={{
            objectFit: "none",
            backgroundColor: "white",
            marginTop: "0px",
            height: "180px",
            textAlign: "center",
          }}
        />
        <Card.Body>
          <Card.Title>Ready for Pickup</Card.Title>
          <CardText
            variant={variant[4]}
            timestamp={trackingNumberData.timestamp5}
          />
        </Card.Body>
        <CardFooter variant={variant[4]} elapsedTime={elapsedTime} />
      </Card>
    </CardGroup>
  );
};

export default TrackingNumberDashboard;