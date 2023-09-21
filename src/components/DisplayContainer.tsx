import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import DisplaySapTote from "./SapToteDisplay";
import { ContGetOne } from "@/utils/pocketbase";
import ContTNList from "./ContTNList";

interface DisplayContainerProps {
  container: RecordModel;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({
  container
}) => {
  const [column1, setColumn1] = useState<RecordModel[]>([]);
  const [column2, setColumn2] = useState<RecordModel[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpandCollapse = async () => {
    setIsExpanded(!isExpanded);
    const cont = await ContGetOne(container.id);
    if (cont.expand === undefined) {
      return;
    }
    if (cont.expand.SapTotes && cont.expand.SapTotes.length > 0) {
      setColumn1(cont.expand.SapTotes);
    }
    
    if (cont.expand.TrackingNumbers && cont.expand.TrackingNumbers.length > 0) {
      setColumn2(cont.expand.TrackingNumbers);
    }
  };
  

  return (
    <ListGroup.Item
      variant={isExpanded ? "light" : "dark"}
      onClick={toggleExpandCollapse}
    >
      Container ID: {container.ContainerID}
      {isExpanded && (
        <Container>
          <Row>
            <Col>
              <ListGroup>
                {column1.map((tote) => (
                  <ListGroup.Item variant="dark" key={tote.id}>
                    <DisplaySapTote SapTote={tote} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ContTNList trackingNumbersList={column2}/>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </ListGroup.Item>
  );
};

export default DisplayContainer;
