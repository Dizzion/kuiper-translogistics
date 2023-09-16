"use client";
import { HUUpdate, STCreate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useRef, useState } from "react";
import HandlingUnitList from "./HandlingUnitList";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

interface SapToteFormProps {
  handlingUnits: RecordModel[];
}

const SapToteForm: React.FC<SapToteFormProps> = ({ handlingUnits }) => {
  const modalRef = useRef(null);
  const [printLabel, setPrintLabel] = useState({
    toteId: "",
    hus: [] as number[],
  });
  const [uid, setUid] = useState(
    `SAP_${Date.now()}-${Math.floor(Math.random() * 10000)}`
  );
  const [HUids, setHUids] = useState<string[]>([]);
  const [enteredHandlingUnits, setEnteredHandlingUnits] = useState<number[]>(
    []
  );
  const [enteredHandlingUnit, setEnteredHandlingUnit] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [printModal, setPrintModal] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  function handleClose() {
    setShowAlert(false);
    setEnteredHandlingUnit("");
  }

  const updateHandlingUnits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredHandlingUnits.length === 0) {
      setStartTime(new Date());
    }
    const enteredIndex = handlingUnits.findIndex(
      (obj) => obj.HU === Number(enteredHandlingUnit)
    );
    if (
      enteredIndex === -1 ||
      !/^(199|133|299|233)/.test(enteredHandlingUnit)
    ) {
      setShowAlert(true);
      return;
    }
    const HUtoUpdate = {
      HU: handlingUnits[enteredIndex].HU,
      ToQI: handlingUnits[enteredIndex].ToQI,
      StagedTime: new Date(),
      alias: localStorage.getItem("id") as string,
    };
    const updatedHU = await HUUpdate(
      handlingUnits[enteredIndex].id,
      HUtoUpdate
    );
    setHUids([...HUids, updatedHU.id]);
    setEnteredHandlingUnits([...enteredHandlingUnits, updatedHU.HU]);
    setEnteredHandlingUnit("");
  };

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

  const submitSapTote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredHandlingUnits.length === 0) {
      return;
    }
    const SapToteCreated = {
      ToteID: uid,
      StartLoading: startTime,
      StagedTime: new Date(),
      HU: HUids,
      alias: localStorage.getItem("id") as string,
    };
    setPrintLabel({
      toteId: uid,
      hus: enteredHandlingUnits,
    });
    await STCreate(SapToteCreated);
    setPrintModal(true);
    setUid(`SAP_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    setHUids([]);
    setEnteredHandlingUnit("");
    setEnteredHandlingUnits([]);
  };

  return (
    <>
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Handling Unit Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is not a valid Handling Unit make sure you scanning the write
          barcode.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Form onSubmit={submitSapTote}>
        <Form.Label className="text-white">Tote ID</Form.Label>
        <Form.Control disabled size="lg" value={uid} />
        <Button type="submit" variant="outline-light">
          Submit SAP Tote
        </Button>
      </Form>
      <Form onSubmit={updateHandlingUnits}>
        <Form.Label className="text-white">Handling Unit</Form.Label>
        <Form.Control
          type="Handling Unit"
          required
          value={enteredHandlingUnit}
          onChange={(e) => setEnteredHandlingUnit(e.target.value)}
        />
      </Form>

      <HandlingUnitList handlingUnits={enteredHandlingUnits} />
      <Modal
        show={printModal}
        className="printModal3"
        style={{
          display: "block",
          width: "6in",
          height: "4in",
          padding: "10px",
          border: "1px solid #000",
        }}
      >
        <div ref={modalRef}>
          <Modal.Header>SAP Tote ID: {printLabel.toteId}</Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={2}>
                <QRCodeCanvas size={60} value={printLabel.toteId} />
              </Col>
              <Col sm={8}>
                <div className="grid-container">
                  {printLabel.hus.map((hu) => (
                    <a className="grid-item" key={hu}>
                      {hu} <QRCodeCanvas size={10} value={hu.toString()} />
                    </a>
                  ))}
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </div>
        <Button type="button" onClick={() => handlePrint()}>
          Close Label
        </Button>
        <Button type="button" onClick={() => setPrintModal(false)}>
          Close Label
        </Button>
      </Modal>
    </>
  );
};

export default SapToteForm;
