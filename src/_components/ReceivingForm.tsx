"use client";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import HandlingUnitList from "./HanldingUnitList";

interface ReceivingFormProps {
  employees: RecordModel[];
  trackingNumbers: RecordModel[];
}
export interface Requestor {
  name: string;
  building: string;
  inventory: boolean;
  freight: boolean;
  jira: string;
  handlingUnits: number[];
  coupaPoLines: string;
}

const ReceivingForm: React.FC<ReceivingFormProps> = ({
  employees,
  trackingNumbers,
}) => {
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [enteredHUs, setEnteredHUs] = useState<number[]>([]);
  const [enteredHU, setEnteredHU] = useState("");
  const [freightInventory, setFreightInventory] = useState({
    inventory: "",
    freight: "",
  });
  const [requestor, setRequestor] = useState<Requestor>({
    name: "",
    building: "",
    inventory: false,
    freight: false,
    jira: "",
    handlingUnits: [],
    coupaPoLines: "",
  });

  function pullRequestorBuilding(e: string) {
    const requestorName = e;
    const requestorIndex = employees.findIndex(
      (employee) => employee.Full_Name === requestorName
    );
    setRequestor({
      ...requestor,
      name: requestorName,
      building: employees[requestorIndex].default_location,
    });
  }

  const updateHandlingUnitList = (e: React.FormEvent): void => {
    e.preventDefault();
    if (enteredHUs.includes(Number(enteredHU))) {
      setEnteredHU("");
      return;
    } else if (!/^(199|133|299|233)/.test(enteredHU)) {
      setShowAlert(true);
      return;
    }
    setEnteredHUs([...enteredHUs, Number(enteredHU)]);
    setEnteredHU("");
  };

  function updateAsReceived(
    enteredTrackingNumber: string,
    requestor: Requestor
  ): void {
    const newTimestamp = new Date().toLocaleString();

    const existingTrackingNumberIndex = trackingNumbers.findIndex(
      (trackingNumber) => trackingNumber.id === enteredTrackingNumber
    );
    if (
      existingTrackingNumberIndex !== -1 &&
      typeof requestor.inventory === "boolean" &&
      typeof requestor.freight === "boolean"
    ) {
      trackingNumbers[existingTrackingNumberIndex].received133 = newTimestamp;
      trackingNumbers[existingTrackingNumberIndex].requestorName =
        requestor.name;
      trackingNumbers[existingTrackingNumberIndex].requestorBuilding =
        requestor.building;
      trackingNumbers[existingTrackingNumberIndex].inventory =
        requestor.inventory;
      trackingNumbers[existingTrackingNumberIndex].freight = requestor.freight;
      trackingNumbers[existingTrackingNumberIndex].jira = requestor.jira;
      trackingNumbers[existingTrackingNumberIndex].coupaPoLines =
        requestor.coupaPoLines;
      trackingNumbers[existingTrackingNumberIndex].handlingUnits =
        requestor.handlingUnits;
    } else {
      const newTrackingNumber = {
        id: enteredTrackingNumber,
        outbound99: "",
        inbound133: "",
        received133: newTimestamp,
        outbound133: "",
        inbound99: "",
        handlingUnits: requestor.handlingUnits,
        coupaPoLines: requestor.coupaPoLines,
        requestorName: requestor.name,
        requestorBuilding: requestor.building,
        inventory: requestor.inventory,
        freight: requestor.freight,
        jira: requestor.jira,
      };
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (requestor.name !== "") {
      setRequestor({...requestor, inventory: Boolean(Number(freightInventory.inventory))});
      setRequestor({...requestor, freight: Boolean(Number(freightInventory.freight))});
      updateAsReceived(enteredTrackingNumber, requestor);
      setEnteredTrackingNumber("");
      setRequestor({
        name: "",
        building: "",
        inventory: false,
        freight: false,
        jira: "",
        handlingUnits: [],
        coupaPoLines: "",
      });
    }
  }
  function handleClose(): void {
    setShowAlert(false);
    setEnteredHU("");
  }
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter key press
          }
        }}
      >
        <Form.Group>
          <Form.Label className="text-white">Tracking Number</Form.Label>
          <Form.Control
            type="trackingNumber"
            size="lg"
            placeholder="Tracking Number Here"
            required
            value={enteredTrackingNumber}
            onChange={(e) => setEnteredTrackingNumber(e.target.value)}
          />
          <Row>
            <Col>
              <Form.Label className="text-white">Requestors Name</Form.Label>
              <Form.Control
                type="name"
                size="sm"
                required
                value={requestor.name}
                onChange={(e) => pullRequestorBuilding(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label className="text-white">
                Requestors Location
              </Form.Label>
              <Form.Control
                type="location"
                size="sm"
                disabled
                value={requestor.building}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="text-white">
                Inventory or Non-Inventory
              </Form.Label>
              <Form.Select
                size="sm"
                required
                onChange={(e) =>
                  setFreightInventory({
                    ...freightInventory,
                    inventory: e.target.value,
                  })
                }
              >
                <option></option>
                <option value={0}>Non-Inventory</option>
                <option value={1}>SAP Inventory</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="text-white">Freight?</Form.Label>
              <Form.Select
                size="sm"
                required
                onChange={(e) =>
                  setFreightInventory({
                    ...freightInventory,
                    freight: e.target.value,
                  })
                }
              >
                <option></option>
                <option value={0}>Yes</option>
                <option value={1}>No</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="text-white">Jira</Form.Label>
              <Form.Control
                type="jira"
                size="sm"
                value={requestor.jira}
                onChange={(e) =>
                  setRequestor({ ...requestor, jira: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Label className="text-white">CoupaPO & Lines</Form.Label>
              <Form.Control
                type="coupaPoLines"
                size="sm"
                placeholder="B901-XXXXXXXX(Lines X,X-X,X)"
                required
                value={requestor.coupaPoLines}
                onChange={(e) =>
                  setRequestor({ ...requestor, coupaPoLines: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Button type="submit" variant="outline-light">
          Receive Package
        </Button>
      </Form>
      <Form onSubmit={updateHandlingUnitList}>
        <Form.Label className="text-white">Handling Unit</Form.Label>
        <Form.Control
          type="Handling Unit"
          required
          value={enteredHU}
          onChange={(e) => setEnteredHU(e.target.value)}
        />
      </Form>
      <HandlingUnitList handlingUnits={enteredHUs} />
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered has not been scanned into
          the system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceivingForm;
