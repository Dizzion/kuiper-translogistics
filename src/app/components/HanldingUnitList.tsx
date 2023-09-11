import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface HandlingUnitListProps {
  handlingUnits: string[];
}

const HandlingUnitList: React.FC<HandlingUnitListProps> = ({
  handlingUnits,
}) => {
  const column1 = handlingUnits.filter((_, index) => index % 2 === 0);
  const column2 = handlingUnits.filter((_, index) => index % 2 !== 0);
  return (
    <div>
      <h4 className="text-white">Handling Units: {handlingUnits.length}</h4>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {column1.map((handlingUnit) => (
                <ListGroup.Item variant="dark" key={handlingUnit}>
                  {handlingUnit}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              {column2.map((handlingUnit) => (
                <ListGroup.Item variant="dark" key={handlingUnit}>
                  {handlingUnit}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HandlingUnitList;