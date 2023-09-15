import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ContainerContents from "./ContainerContents";
import DisplaySapTote from "./SapToteDisplay";
import TrackingNumberList from "./TrackingNumberList";

interface DisplayContainerProps {
  container: RecordModel;
  trackingNumbers: RecordModel[];
  sapTotes: RecordModel[];
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({
  container,
  trackingNumbers,
  sapTotes,
}) => {
  const [column1, setColumn1] = useState<RecordModel[]>([]);
  const [column2, setColumn2] = useState<RecordModel[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {}, []);

  const toggleExpandCollapse = async () => {
    setIsExpanded(!isExpanded);
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/Containers/records/${container.id}?expand=TrackingNumbers,SapTotes`,
      { cache: "no-store" }
    );
    const cont = await res.json();
    
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
                <TrackingNumberList trackingNumbersList={column2}/>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </ListGroup.Item>
  );
};

export default DisplayContainer;
