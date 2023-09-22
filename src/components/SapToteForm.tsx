"use client";
import { HUGetByHU, HUUpdate, STCreate } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useRef, useState } from "react";
import HandlingUnitList from "./HandlingUnitList";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import QRCode from "qrcode";
import Image from "next/image";

interface SapToteFormProps {
  handlingUnits: RecordModel[];
}

const SapToteForm: React.FC<SapToteFormProps> = ({ handlingUnits }) => {
  const modalRef = useRef(null);
  const [printLabel, setPrintLabel] = useState({
    toteId: "",
    qrcode: "",
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
    if (enteredHandlingUnits.length <= 0) {
      setStartTime(new Date());
    }
    const searchedHU = await HUGetByHU(Number(enteredHandlingUnit));
    console.log(searchedHU);
    if (
      !searchedHU.items[0] ||
      !/^(199|133|299|233)/.test(enteredHandlingUnit) ||
      enteredHandlingUnits.includes(Number(enteredHandlingUnit))
    ) {
      setShowAlert(true);
      return;
    }
    const HUtoUpdate = {
      HU: searchedHU.items[0].HU,
      ToQI: searchedHU.items[0].ToQI,
      StagedTime: new Date(),
      alias: localStorage.getItem("id") as string,
    };
    const updatedHU = await HUUpdate(
      searchedHU.items[0].id,
      HUtoUpdate
    );
    setHUids([...HUids, updatedHU.id]);
    setEnteredHandlingUnits([...enteredHandlingUnits, updatedHU.HU]);
    setEnteredHandlingUnit("");
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
          "@page { size: landscape; }"
        );
        printWindow.document.write(
          ".grid-container { display: grid; grid-template-columns: auto auto auto; white-space: nowrap; }"
        );
        
        printWindow.document.write(
          ".grid-item { font-size: 15px; text-align: center; padding: 2px; }"
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
          '<div style="padding: 10px; border: 1px solid #000;">'
        );

        printWindow.document.write(modalCurrent.innerHTML);

        printWindow.document.write("</div>");

        printWindow.document.write("</body></html>");

        printWindow.document.close();
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
      qrcode: await QRCode.toDataURL(uid),
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
        <Button style={{marginTop: "5px", marginBottom: "15px"}} type="submit" variant="outline-light">
          Submit SAP Tote
        </Button>
      </Form>
      <Form onSubmit={updateHandlingUnits}>
        <Form.Control
          type="Handling Unit"
          required
          placeholder="199XXXXXXX, 299XXXXXXX, 133XXXXXXX, 233XXXXXXX"
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
        <Modal.Dialog ref={modalRef}>
          <Modal.Header>SAP Tote ID: {printLabel.toteId}</Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={2}>
                <Image width={90} height={90} src={printLabel.qrcode} alt="QR Code" />
              </Col>
              <Col sm={7}>
                <div className="grid-container">
                  {printLabel.hus.map((hu) => (
                    <a className="grid-item" key={hu}>
                      {hu}
                    </a>
                  ))}
                </div>
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

export default SapToteForm;
