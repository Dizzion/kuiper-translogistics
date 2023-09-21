import { RecordModel } from "pocketbase";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

interface DisplayDetailsProps {
  fullTNData: RecordModel;
}

const DisplayDetails: React.FC<DisplayDetailsProps> = ({ fullTNData }) => {
  useEffect(() => {}, [fullTNData]);
  return (
    <Container className="text-white">
      <Row>
        <h1>Tracking Number: {fullTNData.TrackingNumber}</h1>
      </Row>
      {fullTNData.Outbound99 ? (
        <Row>
          <Col>
            <h3>Outbound 99: {fullTNData.Outbound99}</h3>
          </Col>
          <Col>Inbound 133: {fullTNData.Inbound133}</Col>
        </Row>
      ) : (
        <></>
      )}
      {fullTNData.Delivered ? (
        <Row>
          <h2>Arrived at 133?: {fullTNData.Delivered}</h2>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <h3>Arrived at 133?: {fullTNData.Received133}</h3>
      </Row>
      <Row>
        <Col>
          <h3>Outbound 133: {fullTNData.Outbound133}</h3>
        </Col>
        <Col>Inbound 133: {fullTNData.Inbound133}</Col>
      </Row>
      <Row>
        <Col>
          <h4>Requestor: {fullTNData.full_name}</h4>
        </Col>
        <Col>
          <h4>Requestor Location: {fullTNData.defualt_location}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Coupa Po and Lines: {fullTNData.CoupaPOLines}</h5>
        </Col>
        <Col>
          <h5>SAP: {fullTNData.SAP}</h5>
        </Col>
      </Row>
      {fullTNData.SAP === "Yes" ? <Row></Row> : <></>}
    </Container>
  );
};

export default DisplayDetails;
