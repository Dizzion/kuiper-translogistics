import { RecordModel } from 'pocketbase'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

interface DisplayContainerProps {
    container: RecordModel;
    trackingNumbers: RecordModel[];
    sapTotes: RecordModel[];
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({ container, trackingNumbers, sapTotes }) => {
    const [trackingDataList, setTrackingDataList] = useState<string[]>([]);
    const [column1, setColumn1] = useState<string[]>([]);
    const [column2, setColumn2] = useState<string[]>([]);

    useEffect(() => {
        container.TrackingNumbers.forEach((id: string) => {
            const index = trackingNumbers.findIndex((tn) => tn.id === id);
            setTrackingDataList([...trackingDataList, trackingNumbers[index].TrackingNumber]);
        });
        container.SapTotes.forEach((id: string) => {
            const index = sapTotes.findIndex((st) => st.id === id);
            setTrackingDataList([...trackingDataList, sapTotes[index].ToteID]);
        });
        setColumn1(trackingDataList.filter((_, index) => index % 2 === 0));
        setColumn2(trackingDataList.filter((_, index) => index % 2 !== 0));
    }, []);
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
  )
}

export default DisplayContainer