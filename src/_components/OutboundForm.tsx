"use client";
import { ContCreate, TNCreate, TNUpdate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useRef, useState } from "react";
import { Form, Button, Modal, ListGroup, Col, Row } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import DisplaySapTote from "./SapToteDisplay";
import QRCode from "qrcode";

interface OutboundFormProps {
  sapTotes: RecordModel[];
  trackingNumbers: RecordModel[];
}

const OutboundForm: React.FC<OutboundFormProps> = ({
  sapTotes,
  trackingNumbers,
}) => {
  const modalRef = useRef(null);
  const [printModal, setPrintModal] = useState(false);
  const [printLabel, setPrintLabel] = useState({
    qrcode: "",
    containerId: "",
  });
  const [stIds, setStIds] = useState<string[]>([]);
  const [tnIds, setTnIds] = useState<string[]>([]);
  const [enteredSapTotes, setEnteredSapTotes] = useState<RecordModel[]>([]);
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [showAlert, setShowAlert] = useState(false);
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [containerId, setContainerId] = useState("");
  const [startTime, setStartTime] = useState(new Date());

  function handleLocationChange(value: string): void {
    setLocationTag(value);
    if (locationTag !== "99" && locationTag !== "133") {
      setContainerId(`SEA_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    }
  }

  const changeTrackingNumberData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stIds.length === 0 && tnIds.length === 0) {
      setStartTime(new Date());
    }
    if (locationTag === "99" && !/^(SAP_)/.test(enteredTracking)) {
      const createRecord = {
        TrackingNumber: enteredTracking,
        Outbound99: new Date(),
        alias: localStorage.getItem("id") as string,
      };
      const createdTn = await TNCreate(createRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, createdTn]);
      setTnIds([...tnIds, createdTn.id]);
    } else if (locationTag === "133" && !/^(SAP_)/.test(enteredTracking)) {
      const tnIndex = trackingNumbers.findIndex(
        (obj) => obj.TrackingNumber === enteredTracking
      );
      if (tnIndex === -1) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      const updateRecord = {
        TrackingNumber: trackingNumbers[tnIndex].TrackingNumber,
        Outbound133: new Date(),
        alias: localStorage.getItem("id") as string,
      };
      const updatedTn = await TNUpdate(
        trackingNumbers[tnIndex].id,
        updateRecord
      );
      setEnteredTrackingNumbers([...enteredTrackingNumbers, updatedTn]);
      setTnIds([...tnIds, updatedTn.id]);
    } else if (/^(SAP_)/.test(enteredTracking)) {
      const stIndex = sapTotes.findIndex(
        (obj) => obj.ToteID === enteredTracking
      );
      if (stIndex === -1) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      setStIds([...stIds, sapTotes[stIndex].id]);
      setEnteredSapTotes([...enteredSapTotes, sapTotes[stIndex]]);
    } else {
      setShowAlert(true);
    }
    setEnteredTracking("");
  };

  const handlePrint = async () => {
    const modalCurrent = modalRef.current as HTMLElement | null;
    if (modalCurrent) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Print</title></head><body>"
        );

        printWindow.document.write(
          '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
        );

        printWindow.document.write("<style>");
        printWindow.document.write(
          "div { justify-content: center; text-align: center; }"
        );
        printWindow.document.write("</style>");

        printWindow.document.write(
          '<link rel="stylesheet" type="text/css" href="C:/Users/gofro/Documents/NextJSProjects/kuiper-translogistics/src/app/globals.css">'
        );

        printWindow.document.write(
          '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>'
        );
        printWindow.document.write(
          '<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>'
        );
        printWindow.document.write(
          '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>'
        );

        printWindow.document.write(
          '<div style="width: 6in; height: 4in; padding: 10px; border: 1px solid #000;">'
        );

        printWindow.document.write(modalCurrent.innerHTML);

        printWindow.document.write("</div>");

        printWindow.document.write("</body></html>");

        printWindow.document.close();
      }
    }
  };

  const submitContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredContainer = {
      ContainerID: containerId,
      StartTime: startTime,
      StagedTime: new Date(),
      TrackingNumbers: tnIds,
      SapTotes: stIds,
      alias: localStorage.getItem("id") as string,
    };
    setPrintLabel({
      qrcode: await QRCode.toDataURL(containerId),
      containerId: containerId,
    });
    setPrintModal(true);
    await ContCreate(enteredContainer);
    setContainerId("");
    setLocationTag("");
    setStIds([]);
    setTnIds([]);
    setEnteredTrackingNumbers([]);
    setEnteredSapTotes([]);
  };

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTracking("");
  }

  return (
    <>
      <Form
        onSubmit={submitContainer}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter key press
          }
        }}
      >
        <Form.Group className="text-center">
          <Form.Label className="text-white">Location</Form.Label>
          <Form.Select
            size="lg"
            placeholder="99 or 133?"
            required
            value={locationTag}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <option>Select Your Location</option>
            <option value="99">SEA99</option>
            <option value="133">SEA133</option>
          </Form.Select>
          <Form.Label className="text-white">Container ID</Form.Label>
          <Form.Control
            type="containterID"
            size="lg"
            placeholder="Which Container are you loading?"
            disabled
            value={containerId}
          />
        </Form.Group>
        <Button variant="outline-light" type="submit">
          Submit Container
        </Button>
      </Form>
      <Form onSubmit={changeTrackingNumberData} className="text-center">
        <Form.Label className="text-white">Tracking Number</Form.Label>
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          value={enteredTracking}
          onChange={(e) => setEnteredTracking(e.target.value)}
        />
      </Form>
      <ListGroup>
        {enteredSapTotes.map((SapTote) => (
          <ListGroup.Item variant="dark" key={SapTote.id}>
            <DisplaySapTote SapTote={SapTote} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <TrackingNumberList trackingNumbersList={enteredTrackingNumbers} />
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Number Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The tracking number that you have entered has an error please make
          sure you are scanning the correct code.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={printModal}
        className="printModal2"
        style={{
          display: "block",
          width: "6in",
          height: "4in",
          padding: "10px",
          border: "1px solid #000",
        }}
      >
        <Modal.Dialog ref={modalRef}>
          <Modal.Header>Container ID:</Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={4} md={4}>
                <img src={printLabel.qrcode} alt="QR Code" />
              </Col>
              <Col xs={8} md={8}>
                <h5>{printLabel.containerId}</h5>
              </Col>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
        <Button type="button" onClick={() => handlePrint()}>
          Print Label
        </Button>
        <Button type="button" onClick={() => setPrintModal(false)}>
          Close Label
        </Button>
      </Modal>
    </>
  );
};

export default OutboundForm;
