"use client";
import {
  ContCreate,
  ContGetByContId,
  STGetBySTID,
  TNCreate,
  TNDelete,
  TNGetByTN,
  TNUpdate,
  TrackingNumber,
} from "@/utils/pocketbase";
import { useRouter } from "next/navigation";
import { RecordModel } from "pocketbase";
import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Modal,
  ListGroup,
  Col,
  Row,
  Stack,
} from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import DisplaySapTote from "./SapToteDisplay";
import QRCode from "qrcode";
import Image from "next/image";

interface OutboundFormProps {
  sapTotes: RecordModel[];
  trackingNumbers: RecordModel[];
}

const OutboundForm: React.FC<OutboundFormProps> = ({
  sapTotes,
  trackingNumbers,
}) => {
  const modalRef = useRef(null);
  const router = useRouter();
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
  const [reprintId, setReprintId] = useState("");
  const [updateCont, setUpdateCont] = useState(false);
  const [updateId, setUpdateId] = useState("");
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
        aliasOut99: localStorage.getItem("id") as string,
      };
      const createdTn = await TNCreate(createRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, createdTn]);
      setTnIds([...tnIds, createdTn.id]);
    } else if (locationTag === "133" && !/^(SAP_)/.test(enteredTracking)) {
      const tnIndex = await TNGetByTN(enteredTracking);
      if (!tnIndex.items[0]) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      const updateRecord = {
        TrackingNumber: tnIndex.items[0].TrackingNumber,
        Outbound133: new Date(),
        aliasOut133: localStorage.getItem("id") as string,
      };
      const updatedTn = await TNUpdate(tnIndex.items[0].id, updateRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, updatedTn]);
      setTnIds([...tnIds, updatedTn.id]);
    } else if (/^(SAP_)/.test(enteredTracking)) {
      const stIndex = await STGetBySTID(enteredTracking);
      if (!stIndex) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      setStIds([...stIds, stIndex.items[0].id]);
      setEnteredSapTotes([...enteredSapTotes, stIndex.items[0]]);
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
        printWindow.document.write("@page { size: landscape; }");
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

  const removeScannedTN = async (id: string) => {
    const indexOfETNs = enteredTrackingNumbers.findIndex(
      (obj) => obj.id === id
    );
    const updatedTNs = enteredTrackingNumbers.filter((obj) => obj.id !== id);
    const updatedEIDTNs = tnIds.filter((obj) => obj !== id);
    let record = enteredTrackingNumbers[
      indexOfETNs
    ] as unknown as TrackingNumber;
    setEnteredTrackingNumbers(updatedTNs);
    setTnIds(updatedEIDTNs);
    if (locationTag === "99") {
      await TNDelete(id);
    } else if (locationTag == "133") {
      record = {
        ...record,
        Outbound133: "" as unknown as Date,
        aliasOut133: "",
      };
      await TNUpdate(id, record);
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

  const reprintLabel = async () => {
    if(!/^(SEA_)/.test(reprintId)) {
      setReprintId('');
      return;
    }
    setPrintLabel({
      qrcode: await QRCode.toDataURL(reprintId),
      containerId: reprintId,
    });
    setPrintModal(true);
    setReprintId("");
  };

  function handleClose(): void {
    setShowAlert(false);
    setUpdateCont(false);
    setEnteredTracking("");
  }

  async function moveToUpdate() {
    const contToUpdate = await ContGetByContId(updateId);
    if (contToUpdate.items[0]) {
      router.push(`/Translogistics/Outbound/${contToUpdate.items[0].id}`);
    }
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
        <Form.Group>
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
        <Button
          style={{ marginTop: "5px", marginBottom: "15px" }}
          variant="outline-light"
          type="submit"
        >
          Submit Container
        </Button>
      </Form>
      <Stack direction="horizontal" gap={3}
          style={{ marginTop: "5px", marginBottom: "15px" }}>
        <Form.Control
          value={reprintId}
          size="sm"
          className="me-auto"
          placeholder="Reprint ID here"
          onChange={(e) => setReprintId(e.target.value.toUpperCase())}
        />
        <Button
          variant="outline-warning"
          type="button"
          onClick={() => reprintLabel()}
        >
          Reprint
        </Button>
        <div className="vr" />
        <Button
          type="button"
          variant="outline-info"
          onClick={() => setUpdateCont(true)}
          style={{fontSize: "12px"}}
        >
          Update Container
        </Button>
      </Stack>
      <Form onSubmit={changeTrackingNumberData} className="text-center">
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
      <TrackingNumberList
        trackingNumbersList={enteredTrackingNumbers}
        removeScannedTN={removeScannedTN}
      />
      <Modal centered show={updateCont} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Need to Update a Container?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={moveToUpdate}>
            <Form.Control
              type="contId"
              placeholder="Container ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
          padding: "10px",
        }}
        centered
      >
        <Modal.Dialog ref={modalRef}>
          <Modal.Header>Container ID:</Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={4} md={4}>
                <Image
                  src={printLabel.qrcode}
                  alt="QR Code"
                  width="200"
                  height="200"
                />
              </Col>
              <Col xs={8} md={8}>
                <h5>{printLabel.containerId}</h5>
              </Col>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
        <Modal.Footer>
          <Button type="button" onClick={() => handlePrint()}>
            Print Label
          </Button>
          <Button type="button" onClick={() => setPrintModal(false)}>
            Close Label
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OutboundForm;
