"use client";
import { TNGetByTN } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import DisplayDetails from "./DisplayDetails";

const DetailedSearch = () => {
  const [enteredTN, setEnteredTN] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [fullTNData, setFullTNData] = useState<RecordModel>();

  const searchTNDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchedTN = await TNGetByTN(enteredTN);
    if (searchedTN === undefined) {
      setShowAlert(true);
      setEnteredTN("");
      return;
    }
    const fixedsearchedTN = {
      ...searchedTN.items[0],
      Outbound99: new Date(searchedTN.items[0].Outbound99),
      Inbound133: new Date(searchedTN.items[0].Inbound133),
      Delivered: new Date(searchedTN.items[0].Delivered),
      Received133: new Date(searchedTN.items[0].Received133),
      Outbound133: new Date(searchedTN.items[0].Outbound133),
      Inbound99: new Date(searchedTN.items[0].Inbound99),
    };
    if (searchedTN.items[0].expand) {
      for (const HU of fixedsearchedTN.expand.HU) {
        HU.ToQI = new Date(HU.ToQI);
        HU.StagedTime = new Date(HU.StagedTime);
      }
    }
    console.log(fixedsearchedTN);
    setFullTNData(fixedsearchedTN);
    setEnteredTN("");
  };

  function handleClose() {
    setShowAlert(false);
  }

  return (
    <Container>
      <Form onSubmit={searchTNDetails}>
        <Form.Label className="text-white">
          Search Detailed Tracking Number Info
        </Form.Label>
        <Form.Control
          type="trackingNumber"
          value={enteredTN}
          placeholder="Enter Tracking Number"
          onChange={(e) => setEnteredTN(e.target.value)}
        />
        <Button
          style={{ marginTop: ".5rem" }}
          type="submit"
          variant="outline-light"
        >
          Search
        </Button>
      </Form>
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered was not found.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-md-center">
        {fullTNData !== undefined ? (
          <DisplayDetails fullTNData={fullTNData} />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default DetailedSearch;
