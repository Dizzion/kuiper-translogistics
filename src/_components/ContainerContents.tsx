import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

interface ContainerContentsProps {
  column1: string[];
  column2: string[];
}

const ContainerContents: React.FC<ContainerContentsProps> = ({
  column1,
  column2,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {column1.map((trackingData) => (
              <ListGroup.Item variant="dark" key={trackingData}>
                {trackingData}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            {column2.map((trackingData) => (
              <ListGroup.Item variant="dark" key={trackingData}>
                {trackingData}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ContainerContents;
