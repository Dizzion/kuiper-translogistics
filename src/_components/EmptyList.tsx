import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface EmptyToteListProps {
  emptyTotes: string[];
}

const EmptyToteList: React.FC<EmptyToteListProps> = ({
  emptyTotes,
}) => {
  const column1 = emptyTotes.filter((_, index) => index % 2 === 0);
  const column2 = emptyTotes.filter((_, index) => index % 2 !== 0);
  return (
    <div>
      <h4 className="text-white">Empty SAP Totes: {emptyTotes.length}</h4>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {column1.map((emptyTote) => (
                <ListGroup.Item variant="dark" key={emptyTote}>
                  {emptyTote}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              {column2.map((emptyTote) => (
                <ListGroup.Item variant="dark" key={emptyTote}>
                  {emptyTote}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmptyToteList;