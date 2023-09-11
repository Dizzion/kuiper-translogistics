// components/TrackingNumberList.tsx
import React from "react";
import { TrackingNumber } from "../utils/DataFrame"; 
import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface TrackingNumberListProps {
  trackingNumbers: TrackingNumber[];
}

const TrackingNumberList: React.FC<TrackingNumberListProps> = ({
  trackingNumbers,
}) => {
  const column1 = trackingNumbers.filter((_, index) => index % 2 === 0);
  const column2 = trackingNumbers.filter((_, index) => index % 2 !== 0);
  return (
    <div>
      <h4 className="text-white">Tracking Numbers: {trackingNumbers.length}</h4>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {column1.map((trackingNumber) => (
                <ListGroup.Item variant="dark" key={trackingNumber.id}>
                  {trackingNumber.id}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              {column2.map((trackingNumber) => (
                <ListGroup.Item variant="dark" key={trackingNumber.id}>
                  {trackingNumber.id}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TrackingNumberList;
