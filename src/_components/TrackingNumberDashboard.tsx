import React, { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { CardText } from "./CardText";
import { CardFooter } from "./CardFooter";
import { TrackingNumberData } from "./SearchTrackingNumberCustomer";

interface TrackingNumberDashboardProps {
  trackingNumberData: TrackingNumberData | undefined;
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
    currentVariants: string[],
    timestamps: (Date | null)[],
    delivered: Date | null
  ) => {
    if (delivered !== undefined && delivered !== null) {
      const deliveredVariant = ["secondary", "secondary", "info"];
      currentVariants.splice(0, deliveredVariant.length, ...deliveredVariant);
      setElapsedTime(calculateTime(delivered));
    }
    if (timestamps[0] === null && timestamps[1] === null && timestamps[2]) {
      [currentVariants[0], currentVariants[1]] = ["secondary", "secondary"];
    }
    timestamps.forEach((timestamp, i) => {
      if (timestamp !== undefined && timestamp !== null) {
        currentVariants[i] = "success";
        currentVariants[i + 1] = "info";
        setElapsedTime(calculateTime(timestamp));
      }
    });

    return currentVariants;
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
      typeof trackingNumberData.outbound99 === "undefined"
    ) {
      return;
    }
    const outbound99 = getTimestamp(trackingNumberData.outbound99);
    const inbound133 = getTimestamp(trackingNumberData.inbound133);
    const delivered = getTimestamp(trackingNumberData.delivered);
    const received133 = getTimestamp(trackingNumberData.received133);
    const outbound133 = getTimestamp(trackingNumberData.outbound133);
    const inbound99 = getTimestamp(trackingNumberData.inbound99);

    const variants = calculateVariant(trackingNumberData.outbound99);
    if (
      typeof outbound99 !== "undefined" &&
      typeof inbound133 !== "undefined" &&
      typeof delivered !== "undefined" &&
      typeof received133 !== "undefined" &&
      typeof outbound133 !== "undefined" &&
      typeof inbound99 !== "undefined"
    ) {
      setVariant(
        updateVariant(
          variants,
          [outbound99, inbound133, received133, outbound133, inbound99],
          delivered
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
            timestamp={trackingNumberData?.outbound99}
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
            timestamp={trackingNumberData?.inbound133}
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
            timestamp={trackingNumberData?.received133}
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
            timestamp={trackingNumberData?.outbound133}
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
            timestamp={trackingNumberData?.inbound99}
          />
        </Card.Body>
        <CardFooter variant={variant[4]} elapsedTime={elapsedTime} />
      </Card>
    </CardGroup>
  );
};

export default TrackingNumberDashboard;
