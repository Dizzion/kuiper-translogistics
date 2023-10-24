"use client";
import { useRouter } from "next/navigation";
import {
  TNCreate,
  TNGetByTN,
  TNUpdate,
  STGetBySTID,
  ContUpdate,
  TrackingNumber,
  TNDelete,
  ContGetOne,
} from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
  TooltipProps,
} from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import DisplaySapTote from "./SapToteDisplay";

interface OutboundUpdateProps {
  id: string;
}

const OutboundUpdate: React.FC<OutboundUpdateProps> = ({ id }) => {
  const router = useRouter();
  const [contId, setContId] = useState("");
  const [cont, setCont] = useState<RecordModel>();
  const [locationTag, setLocationTag] = useState("");
  const [enteredTracking, setEnteredTracking] = useState("");
  const [enteredTrackingNumbers, setEnteredTrackingNumbers] = useState<
    RecordModel[]
  >([]);
  const [tnIds, setTnIds] = useState<string[]>([]);
  const [enteredSapTotes, setEnteredSapTotes] = useState<RecordModel[]>([]);
  const [stIds, setStIds] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [enable, setEnable] = useState(true);

  const populateCont = async () => {
    const contToUpdate = await ContGetOne(id);
    if (contToUpdate) {
      setCont(contToUpdate);
      setContId(contToUpdate.ContainerID);
    } else {
      setShowAlert2(true);
    }
  };

  useEffect(() => {
    populateCont();
  }, [id]);

  async function mapContents(toUpdate: string, items: RecordModel[]) {
    if (toUpdate === "TN") {
      items.forEach((obj: RecordModel) => {
        setTnIds((prevTnIds) => [...prevTnIds, obj.id]);
        setEnteredTrackingNumbers((prevEnteredTrackingNumbers) => [
          ...prevEnteredTrackingNumbers,
          obj,
        ]);
      });
    }
    if (toUpdate === "ST") {
      items.forEach((obj: RecordModel) => {
        setStIds([...stIds, obj.id]);
        setEnteredSapTotes([...enteredSapTotes, obj]);
      });
    }
  }

  async function locationTagUpdate(e: string) {
    setLocationTag(e);
    if (e === "99" || e === "133") {
      if (cont && stIds.length === 0 && tnIds.length === 0) {
        if (cont.expand) {
          if (cont.expand.TrackingNumbers) {
            if (cont.expand.TrackingNumbers.length > 0) {
              await mapContents("TN", cont.expand.TrackingNumbers);
            }
          }
          if (cont.expand.SapTotes) {
            if (cont.expand.SapTotes.length > 0) {
              await mapContents("TN", cont.expand.SapTotes);
            }
          }
        }
      }

      setEnable(false);
      return;
    }
    setEnteredSapTotes([]);
    setEnteredTrackingNumbers([]);
    setStIds([]);
    setTnIds([]);
    setEnable(true);
  }

  const changeTrackingNumberData = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const updatedTn = await TNUpdate(tnIndex.id, updateRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, updatedTn.items[0]]);
      setTnIds([...tnIds, updatedTn.items[0].id]);
    } else if (/^(SAP_)/.test(enteredTracking)) {
      const stIndex = await STGetBySTID(enteredTracking);
      if (!stIndex.items[0]) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      setStIds([...stIds, stIndex.id]);
      setEnteredSapTotes([...enteredSapTotes, stIndex]);
    } else {
      setShowAlert(true);
    }
    setEnteredTracking("");
  };

  const submitContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedContainer = {
      StagedTime: new Date(),
      Hold: false,
      TrackingNumbers: tnIds,
      SapTotes: stIds,
      alias: localStorage.getItem("id") as string,
    };
    if (contId) {
      await ContUpdate(id, updatedContainer);
    }
    setShowAlert3(false);
    router.back();
  };

  const handleHold = async () => {
    const updatedContainer = {
      Hold: true,
      TrackingNumbers: tnIds,
      SapTotes: stIds,
      alias: localStorage.getItem("id") as string,
    };
    setShowAlert3(false);
    await ContUpdate(id, updatedContainer);
    router.back();
  };

  const finishForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert3(true);
  };

  function handleClose(): void {
    setShowAlert(false);
    setEnteredTracking("");
  }

  function handleClose2(): void {
    router.back();
  }

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

  const renderWarning = (
    props: React.JSX.IntrinsicAttributes &
      TooltipProps &
      React.RefAttributes<HTMLDivElement>
  ) => (
    <Tooltip id="button-tooltip" {...props}>
      Once Submitted a Container Can't be added to.
    </Tooltip>
  );

  return (
    <>
      <Form
        onSubmit={finishForm}
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
            onChange={(e) => locationTagUpdate(e.target.value)}
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
            value={contId}
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
      <Form onSubmit={changeTrackingNumberData} className="text-center">
        <Form.Control
          type="trackingNumber"
          placeholder="Enter Tracking Number"
          disabled={enable}
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
      <Modal centered show={showAlert2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Container ID Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The Container ID wasn't found please re-enter the ID.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={showAlert3} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What Action Would you like to take?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderWarning}
              >
                <Button
                  variant="warning"
                  type="button"
                  onClick={submitContainer}
                >
                  Submit Container
                </Button>
              </OverlayTrigger>
            </Col>
            <Col>
              <Button variant="info" type="button" onClick={handleHold}>
                Place Container on Hold
              </Button>
            </Col>
          </Row>
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

export default OutboundUpdate;
