import { RecordModel } from "pocketbase";
import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

interface DisplayDetailsProps {
  fullTNData: RecordModel;
}

const DisplayDetails: React.FC<DisplayDetailsProps> = ({ fullTNData }) => {
  useEffect(() => {}, [fullTNData]);
  return (
    <Card
      style={{ width: "50rem" }}
      border="info"
      bg="dark"
      className="text-center text-white"
    >
      <Card.Header as="h4">
        Tracking Number: {fullTNData.TrackingNumber}
      </Card.Header>
      {!isNaN(fullTNData.Outbound99) ? (
        <Row>
          <Col>
            <h5>Outbound 99: {fullTNData.Outbound99.toLocaleString()}</h5>
          </Col>
          <Col>
            <h5>
              Inbound 133:{" "}
              {isNaN(fullTNData.Inbound133) ? (
                <></>
              ) : (
                <>{fullTNData.Inbound133.toLocaleString()}</>
              )}
            </h5>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      {!isNaN(fullTNData.Delivered) ? (
        <Row>
          <h3>Arrived at 133: {fullTNData.Delivered.toLocaleString()}</h3>
        </Row>
      ) : (
        <></>
      )}
      <Row className="text-center">
        <h5>
          Received at 133:{" "}
          {isNaN(fullTNData.Received133) ? (
            <></>
          ) : (
            <>{fullTNData.Received133.toLocaleString()}</>
          )}
        </h5>
      </Row>
      {fullTNData.SAP === "No" ? (
        <Row>
          <Col>
            <h5>
              Outbound 133:{" "}
              {isNaN(fullTNData.Outbound133) ? (
                <></>
              ) : (
                <>{fullTNData.Outbound133.toLocaleString()}</>
              )}
            </h5>
          </Col>
          <Col>
            <h5>
              Inbound 99:{" "}
              {isNaN(fullTNData.Inbound99) ? (
                <></>
              ) : (
                <>{fullTNData.Inbound99.toLocaleString()}</>
              )}
            </h5>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col>
          <p style={{ fontSize: "14px" }}>Requestor: {fullTNData.full_name}</p>
        </Col>
        <Col>
          <p style={{ fontSize: "14px" }}>Requestor Location: {fullTNData.default_location}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ fontSize: "14px" }}>Coupa Po and Lines: {fullTNData.CoupaPOLines}</p>
        </Col>
        <Col>
          <p style={{ fontSize: "14px" }}>SAP: {fullTNData.SAP}</p>
        </Col>
      </Row>
      <Card.Footer>
        {fullTNData.SAP === "Yes" && fullTNData.expand ? (
          <ListGroup>
            {fullTNData.expand.HU.map((handlingUnit: RecordModel) => (
              <ListGroup.Item variant="dark" key={handlingUnit.id}>
                <p style={{ fontSize: "18px" }}>{handlingUnit.HU}</p> To
                Quality: {handlingUnit.ToQI.toLocaleString()} || Staged for
                Transport:{" "}
                {isNaN(handlingUnit.StagedTime) ? (
                  <></>
                ) : (
                  <>{handlingUnit.StagedTime.toLocaleString()}</>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <></>
        )}
      </Card.Footer>
    </Card>
  );
};

export default DisplayDetails;
