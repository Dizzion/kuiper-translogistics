import { RecordModel } from "pocketbase";
import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface ContTNListProps2 {
  trackingNumbersList: RecordModel[];
}

const ContTNList2: React.FC<ContTNListProps2> = ({ trackingNumbersList }) => {
  const column1 = trackingNumbersList.filter((_, index) => index % 2 === 0);
  const column2 = trackingNumbersList.filter((_, index) => index % 2 !== 0);
  return (
    <div>
      <h4 className="text-black">
        Tracking Numbers: {trackingNumbersList.length}
      </h4>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {column1.map((trackingNumber) => (
                <ListGroup.Item variant="dark" key={trackingNumber.id}>
                  {trackingNumber.TrackingNumber}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              {column2.map((trackingNumber) => (
                <ListGroup.Item variant="dark" key={trackingNumber.id}>
                  {trackingNumber.TrackingNumber}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContTNList2;
