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
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import TrackingNumberList from "./TrackingNumberList";
import DisplaySapTote from "./SapToteDisplay";

interface OutboundUpdateProps {
  id: string;
}

const OutboundUpdate: React.FC<OutboundUpdateProps> = ({ id }) => {
  const router = useRouter();
  const [contId, setContId] = useState("");
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
  const [enable, setEnable] = useState(true);

  const populateCont = async () => {
    const contToUpdate = await ContGetOne(id);
    if (contToUpdate.expand) {
      if (contToUpdate.TrackingNumbers) {
        if (contToUpdate.expand.TrackingNumbers.length > 0) {
            console.log(contToUpdate.expand.TrackingNumbers)
          contToUpdate.expand.TrackingNumbers.forEach((tn: RecordModel) => {
            setTnIds([...tnIds, tn.id]);
            setEnteredTrackingNumbers([...enteredTrackingNumbers, tn]);
          });
          console.log(tnIds);
        }
      }
      if (contToUpdate.expand.SapTotes) {
        if (contToUpdate.expand.SapTotes.length > 0) {
          contToUpdate.expand.SapTotes.forEach((st: RecordModel) => {
            setStIds([...stIds, st.id]);
            setEnteredSapTotes([...enteredSapTotes, st]);
          });
        }
      }

      setContId(contToUpdate.ContainerID);
    } else {
      setShowAlert2(true);
    }
  };

  useEffect(() => {
    populateCont();
  }, []);

  function locationTagUpdate(e: string) {
    setLocationTag(e);
    if (e === "99" || e === "133") {
      setEnable(false);
      return;
    }
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
      if (!tnIndex) {
        setShowAlert(true);
        setEnteredTracking("");
        return;
      }
      const updateRecord = {
        TrackingNumber: tnIndex.TrackingNumber,
        Outbound133: new Date(),
        aliasOut133: localStorage.getItem("id") as string,
      };
      const updatedTn = await TNUpdate(tnIndex.id, updateRecord);
      setEnteredTrackingNumbers([...enteredTrackingNumbers, updatedTn]);
      setTnIds([...tnIds, updatedTn.id]);
    } else if (/^(SAP_)/.test(enteredTracking)) {
      const stIndex = await STGetBySTID(enteredTracking);
      if (!stIndex) {
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
      TrackingNumbers: tnIds,
      SapTotes: stIds,
      alias: localStorage.getItem("id") as string,
    };
    if (contId) {
      await ContUpdate(contId, updatedContainer);
    }
    setLocationTag("");
    setStIds([]);
    setTnIds([]);
    setEnteredTrackingNumbers([]);
    setEnteredSapTotes([]);
    router.back();
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
    </>
  );
};

export default OutboundUpdate;
