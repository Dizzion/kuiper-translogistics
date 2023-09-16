"use client";
import { RecordModel } from "pocketbase";
import React, { useRef, useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import HandlingUnitList from "./HandlingUnitList";
import { HUCreate, TNCreate, TNUpdate } from "@/utils/pocketbase";
import { QRCodeCanvas } from "qrcode.react";

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
  handlingUnits: string[];
  coupaPoLines: string;
}

const ReceivingForm: React.FC<ReceivingFormProps> = ({
  employees,
  trackingNumbers,
}) => {
  const modalRef = useRef(null);
  const [modalPrint, setModalPrint] = useState(false);
  const [enteredTrackingNumber, setEnteredTrackingNumber] = useState("");
  const [printLabel, setPrintLabel] = useState({
    trackingNumber: "",
    timestamp: "",
    requestorName: "",
    buildingLocation: "",
    jira: "",
    frieght: "",
    sap: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [enteredHUs, setEnteredHUs] = useState<number[]>([]);
  const [enteredHU, setEnteredHU] = useState("");
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
    if (e === "") {
      setRequestor({ ...requestor, name: e, building: "" });
    }
    const requestorName = e;
    const requestorIndex = employees.findIndex(
      (employee) => employee.Full_Name === requestorName
    );
    if (requestorIndex !== -1) {
      setRequestor({
        ...requestor,
        name: requestorName,
        building: employees[requestorIndex].default_location,
      });
    } else {
      setRequestor({ ...requestor, name: e, building: "" });
    }
  }

  const handlePrint = () => {
    const modalCurrent = modalRef.current as HTMLElement | null;
    if (modalCurrent) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Print</title></head><body>"
        );

        // Clone the content of the Modal to the print window
        printWindow.document.write(
          '<div style="width: 4in; height: 6in; padding: 10px; border: 1px solid #000;">'
        );
        printWindow.document.write(modalCurrent.innerHTML);
        printWindow.document.write("</div>");

        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const updateHandlingUnitList = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date();
    if (enteredHUs.includes(Number(enteredHU))) {
      setEnteredHU("");
      return;
    } else if (!/^(199|133|299|233)/.test(enteredHU)) {
      setShowAlert(true);
      return;
    }
    const HU = {
      HU: Number(enteredHU),
      ToQI: timestamp,
      alias: localStorage.getItem("id") as string,
    };
    const createdHU = await HUCreate(HU);
    setEnteredHUs([...enteredHUs, createdHU.HU]);
    setRequestor({
      ...requestor,
      handlingUnits: [...requestor.handlingUnits, createdHU.id],
    });
    setEnteredHU("");
  };

  async function updateAsReceived(
    enteredTrackingNumber: string,
    requestor: Requestor
  ) {
    const newTimestamp = new Date().toLocaleString();

    const existingTrackingNumberIndex = trackingNumbers.findIndex(
      (trackingNumber) =>
        trackingNumber.TrackingNumber === enteredTrackingNumber
    );
    if (
      existingTrackingNumberIndex !== -1 &&
      typeof requestor.inventory === "boolean" &&
      typeof requestor.freight === "boolean"
    ) {
      const updatedTrackingNumber = {
        TrackingNumber: enteredTrackingNumber,
        Outbound99: trackingNumbers[existingTrackingNumberIndex].Outbound99,
        Inbound133: trackingNumbers[existingTrackingNumberIndex].Inbound133,
        Received133: newTimestamp,
        Outbound133: trackingNumbers[existingTrackingNumberIndex].Outbound133,
        Inbound99: trackingNumbers[existingTrackingNumberIndex].Inbound99,
        full_name: requestor.name,
        default_location: requestor.building,
        CoupaPOLines: requestor.coupaPoLines,
        SAP: requestor.inventory,
        Freight: requestor.freight,
        Jira: requestor.jira,
        HU: requestor.handlingUnits,
        alias: localStorage.getItem("id") as string,
      };
      setPrintLabel({
        trackingNumber: enteredTrackingNumber,
        timestamp: newTimestamp,
        requestorName: requestor.name,
        buildingLocation: requestor.building,
        jira: requestor.jira,
        sap: requestor.inventory.toString(),
        frieght: requestor.freight.toString(),
      });
      await TNUpdate(
        trackingNumbers[existingTrackingNumberIndex].id,
        updatedTrackingNumber
      );
    } else {
      const newTrackingNumber = {
        TrackingNumber: enteredTrackingNumber,
        Outbound99: "",
        Inbound133: "",
        Received133: newTimestamp,
        Outbound133: "",
        Inbound99: "",
        full_name: requestor.name,
        default_location: requestor.building,
        CoupaPOLines: requestor.coupaPoLines,
        SAP: requestor.inventory,
        Freight: requestor.freight,
        Jira: requestor.jira,
        HU: requestor.handlingUnits,
        alias: localStorage.getItem("id") as string,
      };
      setPrintLabel({
        trackingNumber: enteredTrackingNumber,
        timestamp: newTimestamp,
        requestorName: requestor.name,
        buildingLocation: requestor.building,
        jira: requestor.jira,
        sap: requestor.inventory.toString(),
        frieght: requestor.freight.toString(),
      });
      await TNCreate(newTrackingNumber);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (requestor.name !== "") {
      updateAsReceived(enteredTrackingNumber, requestor);
      setModalPrint(true);
      setEnteredHUs([]);
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
                placeholder="Full Name"
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
                placeholder="Auto-Generates from Name"
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
                  setRequestor({
                    ...requestor,
                    inventory: Boolean(e.target.value),
                  })
                }
              >
                <option>Dropdown Options</option>
                <option>Non-Inventory</option>
                <option value={"true"}>SAP Inventory</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="text-white">Freight?</Form.Label>
              <Form.Select
                size="sm"
                required
                onChange={(e) =>
                  setRequestor({
                    ...requestor,
                    freight: Boolean(e.target.value),
                  })
                }
              >
                <option>Dropdown Options</option>
                <option>Yes</option>
                <option value={"true"}>No</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="text-white">Jira</Form.Label>
              <Form.Control
                type="jira"
                size="sm"
                placeholder="PUR-XXXX"
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
          placeholder="199XXXXXXX, 299XXXXXXX, 133XXXXXXX, 233XXXXXXX"
          value={enteredHU}
          onChange={(e) => setEnteredHU(e.target.value)}
        />
      </Form>
      <HandlingUnitList handlingUnits={enteredHUs} />
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Handling Unit Invalid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The Handling Unit you scanned is not valid make sure you scanning the
          correct barcode.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalPrint}
        className="printModal"
        style={{
          width: "4in",
          height: "6in",
          border: "1px solid #000",
        }}
      >
        <div ref={modalRef}>
          <Modal.Header>Received Date: {printLabel.timestamp}</Modal.Header>
          <Modal.Body className="justify-content-center">
            <h3>Requestor:</h3>
            <h2>{printLabel.requestorName}</h2>
            <p>{printLabel.buildingLocation}</p>
            <h5>Jira:</h5>
            <p>{printLabel.jira}</p>
            <Row>
              <Col>
                <h6>Freight:</h6>
                <p>{printLabel.frieght}</p>
              </Col>
              <Col>
                <h6>SAP:</h6>
                <p>{printLabel.sap}</p>
              </Col>
            </Row>
            <h3>Tracking Number:</h3>
            <p>{printLabel.trackingNumber}</p>
            <QRCodeCanvas size={89} value={printLabel.trackingNumber} />
          </Modal.Body>
        </div>
        <Button type="button" onClick={() => handlePrint()}>
          Print Label
        </Button>
        <Button type="button" onClick={() => setModalPrint(false)}>
          Close Label
        </Button>
      </Modal>
    </>
  );
};

export default ReceivingForm;
