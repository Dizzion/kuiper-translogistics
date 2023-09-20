import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import { CardText } from "./CardText";
import { CardFooter } from "./CardFooter";
import { TrackingNumberData } from "./SearchTrackingNumberCustomer";

interface TrackingNumberDashboardProps {
  trackingNumberData: TrackingNumberData;
  variant: string[];
  elapsedTime: string;
}

const TrackingNumberDashboard: React.FC<TrackingNumberDashboardProps> = ({
  trackingNumberData,
  variant,
  elapsedTime
}) => {

  const updatePulse = (variantClass: string): string => {
    let className: string = "";
    if (variantClass === "info") {
      className = "pulsate";
    }
    return className;
  };

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
