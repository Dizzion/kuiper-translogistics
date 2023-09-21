"use client";
import { TNGetByTN } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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
    setFullTNData(searchedTN.items[0]);
    setEnteredTN("");
  };

  function handleClose() {
    setShowAlert(false);
  }

  return (
    <>
      <Form onSubmit={searchTNDetails}>
        <Form.Label className="text-white">
          Search Detailed Tracking Number Info
        </Form.Label>
        <Form.Control
          type="trackingNumber"
          value={enteredTN}
          onChange={(e) => setEnteredTN(e.target.value)}
        />
        <Button type="submit" variant="outline-light">
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
      {fullTNData !== undefined ? (
        <DisplayDetails fullTNData={fullTNData} />
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailedSearch;
