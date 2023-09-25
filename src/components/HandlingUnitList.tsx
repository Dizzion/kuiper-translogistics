import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface HandlingUnitListProps {
  handlingUnits: number[];
}

const HandlingUnitList: React.FC<HandlingUnitListProps> = ({
  handlingUnits,
}) => {
  const [column1, setColumn1] = useState(
    handlingUnits.filter((_, index) => index % 2 === 0)
  );
  const [column2, setColumn2] = useState(
    handlingUnits.filter((_, index) => index % 2 !== 0)
  );
  useEffect(() => {
    setColumn1(handlingUnits.filter((_, index) => index % 2 === 0));
    setColumn2(handlingUnits.filter((_, index) => index % 2 !== 0));
  }, [handlingUnits]);
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
