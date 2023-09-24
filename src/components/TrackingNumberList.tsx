import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

interface TrackingNumberListProps {
  trackingNumbersList: RecordModel[];
  removeScannedTN: (id: string) => void;
}

const TrackingNumberList: React.FC<TrackingNumberListProps> = ({
  trackingNumbersList,
  removeScannedTN,
}) => {
  const [column1, setColumn1] = useState(
    trackingNumbersList.filter((_, index) => index % 2 === 0)
  );
  const [column2, setColumn2] = useState(
    trackingNumbersList.filter((_, index) => index % 2 !== 0)
  );
  useEffect(() => {
    setColumn1(trackingNumbersList.filter((_, index) => index % 2 === 0));
    setColumn2(trackingNumbersList.filter((_, index) => index % 2 !== 0));
  }, [trackingNumbersList]);
  return (
    <div>
      <h4 className="text-white">
        Tracking Numbers: {trackingNumbersList.length}
      </h4>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {column1.map((trackingNumber) => (
                <ListGroup.Item
                  variant="dark"
                  className="d-flex justify-content-between align-items-start"
                  key={trackingNumber.id}
                >
                  <div style={{ fontSize: "18px" }} className="ms-2 me-auto">
                    {trackingNumber.TrackingNumber}
                  </div>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => removeScannedTN(trackingNumber.id)}
                  >
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              {column2.map((trackingNumber) => (
                <ListGroup.Item
                  variant="dark"
                  className="d-flex justify-content-between align-items-start"
                  key={trackingNumber.id}
                >
                  <div style={{ fontSize: "18px" }} className="ms-2 me-auto">
                    {trackingNumber.TrackingNumber}
                  </div>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => removeScannedTN(trackingNumber.id)}
                  >
                    X
                  </Button>
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
