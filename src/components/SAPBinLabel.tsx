"use client";
import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import QRCode from "qrcode";
import Image from "next/image";

const SAPBinLabel = () => {
  const modalRef = useRef(null);
  const [modalPrint, setModalPrint] = useState(false);
  const [binId, setBinId] = useState("");
  const [printLabel, setPrintLabel] = useState({
    binID: "",
    qrCode: "",
    row: "",
    rack: "",
    shelf: "",
    bin: "",
  });

  const handlePrint = async () => {
    const modalCurrent = modalRef.current as HTMLElement | null;
    if (modalCurrent) {
      const printWindow = window.open("", "", "width=600,height=400");
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
          '<div style="width: 4in; height: 2in; padding: 10px;">'
        );

        printWindow.document.write(modalCurrent.innerHTML);

        printWindow.document.write("</div>");

        printWindow.document.write("</body></html>");

        printWindow.document.close();
      }
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const elements = binId.split(".");
    setPrintLabel({
      binID: binId,
      qrCode: await QRCode.toDataURL(binId),
      row: elements[0],
      rack: elements[1],
      shelf: elements[2],
      bin: elements[3],
    });
    setModalPrint(true);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="binID"
          size="lg"
          placeholder="SAP Bin ID here"
          value={binId}
          onChange={(e) => setBinId(e.target.value)}
        />
        <Button type="submit" variant="outline-light">
          Generate Label
        </Button>
      </Form>
      <Modal className="printable-content" show={modalPrint} centered>
        <Modal.Dialog ref={modalRef}>
          <Modal.Body className="justify-content-center">
            <Row>
              <Col>
                <Row>
                  <h2>{printLabel.binID}</h2>
                </Row>
                <Row>
                  <Col>
                    <p>Row:{printLabel.row}</p>
                  </Col>
                  <Col>
                    <p>Rack: {printLabel.rack}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Shelf: {printLabel.shelf}</p>
                  </Col>
                  <Col>
                    <p>Bin: {printLabel.bin}</p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Image
                  src={printLabel.qrCode}
                  alt="QR Code"
                  width="120"
                  height="120"
                />
              </Col>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
        <Modal.Footer>
          <Button type="button" onClick={() => handlePrint()}>
            Print Label
          </Button>
          <Button type="button" onClick={() => setModalPrint(false)}>
            Close Label
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SAPBinLabel;
