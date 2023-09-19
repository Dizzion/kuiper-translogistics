"use client";
import { CreateTruck, UpdateTruck } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Card,
  CardGroup,
} from "react-bootstrap";
import ContainerList from "./ContainerList";

interface TransportationFormProps {
  trucks: RecordModel[];
  containers: RecordModel[];
}
interface Timer {
  id: string;
  startTime: number | null;
  intervalId: NodeJS.Timeout | null;
  elapsedTime: number;
}

const TransportationForm: React.FC<TransportationFormProps> = ({
  trucks,
  containers,
}) => {
  const [truckId, setTruckId] = useState("");
  const [locationTag, setLocationTag] = useState("");
  const [running, setRunning] = useState(false);
  const [loadOrUnload, setLoadOrUnload] = useState("");
  const [enteredContainer, setEnteredContainer] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [arrivalTime, setArrivalTime] = useState<Date>();
  const [containerIds, setContainerIds] = useState<string[]>([]);
  const [containerList, setContainerList] = useState<RecordModel[]>([]);
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: "load",
      startTime: null,
      intervalId: null,
      elapsedTime: 0,
    },
    {
      id: "loadprocessing",
      startTime: null,
      intervalId: null,
      elapsedTime: 0,
    },
    {
      id: "unload",
      startTime: null,
      intervalId: null,
      elapsedTime: 0,
    },
    {
      id: "unloadprocessing",
      startTime: null,
      intervalId: null,
      elapsedTime: 0,
    },
  ]);

  const startTimer = (id: string) => {
    setRunning(true);
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      const timer = newTimers.find((timer) => timer.id === id);

      if (timer) {
        timer.startTime = new Date().getTime();
        timer.intervalId = setInterval(() => {}, 1000);
      }

      return newTimers;
    });
  };

  const stopTimer = (id: string) => {
    setRunning(false);
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      const timer = newTimers.find((timer) => timer.id === id);

      if (timer) {
        clearInterval(timer.intervalId as NodeJS.Timeout);
        timer.intervalId = null;
        const currentTime = new Date().getTime();
        if (timer.startTime) {
          timer.elapsedTime += Math.floor(
            (currentTime - timer.startTime) / 1000
          );
        }
      }

      return newTimers;
    });
  };

  const startTruck = (value: string) => {
    if (truckId === "") {
      setArrivalTime(new Date());
    }
    setTruckId(value);
  };

  const submitTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerList || truckId === "" || locationTag === "") {
      setShowAlert3(true);
      return;
    }
    if (loadOrUnload === "unload") {
      const record = {
        TruckID: truckId,
        ArrivalTime: arrivalTime,
        UnloadTime: timers[2].elapsedTime.toLocaleString(),
        UnloadProcessing: timers[3].elapsedTime.toLocaleString(),
        ArrivalAA: localStorage.getItem("id") as string,
      };
      const truckIndex = trucks.findIndex((obj) =>
        obj.Containers.includes(containerIds[0])
      );
      if (truckIndex === -1) {
        return;
      }
      await UpdateTruck(trucks[truckIndex].id, record);
    } else if (loadOrUnload === "load") {
      const record = {
        TruckID: truckId,
        LoadProcessing: timers[1].elapsedTime.toLocaleString(),
        LoadTime: timers[0].elapsedTime.toLocaleString(),
        DepartureTime: new Date(),
        Containers: containerIds,
        DepartureAA: localStorage.getItem("id") as string,
      };
      await CreateTruck(record);
    }
    setArrivalTime(new Date());
    setContainerIds([]);
    setContainerList([]);
    setEnteredContainer("");
    setLocationTag("");
    setTimers([
      {
        id: "load",
        startTime: null,
        intervalId: null,
        elapsedTime: 0,
      },
      {
        id: "loadprocessing",
        startTime: null,
        intervalId: null,
        elapsedTime: 0,
      },
      {
        id: "unload",
        startTime: null,
        intervalId: null,
        elapsedTime: 0,
      },
      {
        id: "unloadprocessing",
        startTime: null,
        intervalId: null,
        elapsedTime: 0,
      },
    ]);
    setTruckId("");
  };

  const updateEnteredContainer = (e: React.FormEvent) => {
    e.preventDefault();
    const contIndex = containers.findIndex(
      (obj) => obj.ContainerID === enteredContainer
    );
    if (
      contIndex !== -1 &&
      !containerList.some((cont) => cont.ContainerID === enteredContainer)
    ) {
      setContainerIds([...containerIds, containers[contIndex].id]);
      setContainerList([...containerList, containers[contIndex]]);
      setEnteredContainer("");
      return;
    }
    setShowAlert(true);
    setEnteredContainer("");
  };

  function handleClose(): void {
    setShowAlert(false);
    setShowAlert3(false);
  }

  return (
    <>
      <Form onSubmit={submitTruck} className="text-white">
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Location</Form.Label>
              <Form.Select
                size="lg"
                required
                value={locationTag}
                onChange={(e) => setLocationTag(e.target.value)}
              >
                <option>Select Your Location</option>
                <option value="99">SEA99</option>
                <option value="133">SEA133</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Truck ID</Form.Label>
              <Form.Select
                placeholder="A, B, C or D?"
                size="lg"
                value={truckId}
                required
                onChange={(e) => startTruck(e.target.value)}
              >
                <option>Select Truck ID</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Label>Loading or Unloading?</Form.Label>
          <Form.Select
            required
            onChange={(e) => setLoadOrUnload(e.target.value)}
          >
            <option>Select Load or Unload</option>
            <option value="load">Load</option>
            <option value="unload">Unload</option>
          </Form.Select>
        </Form.Group>
        {loadOrUnload === "load" ? (
          <Button type="submit" variant="outline-dark">
            Depart Load
          </Button>
        ) : (
          <Button type="submit" variant="outline-dark">
            Finish Unload
          </Button>
        )}
      </Form>
      <Modal centered show={showAlert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your Container Scan wasnt a valid entry please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={showAlert3} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Missing Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your missing part of the form entry please check your inputs and try
          again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {loadOrUnload === "load" ? (
        <>
          <CardGroup>
            <Card bg="secondary" style={{ width: "18rem" }}>
              <Card.Header className="text-white">Processing</Card.Header>
              <Card.Body key={timers[1].id}>
                {running === true ? (
                  <p>Running......</p>
                ) : (
                  <p>Elapsed Time: {timers[1].elapsedTime} seconds</p>
                )}
                <Button
                  variant="outline-light"
                  onClick={() => startTimer(timers[1].id)}
                >
                  Start
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => stopTimer(timers[1].id)}
                >
                  Stop
                </Button>
              </Card.Body>
            </Card>
            <Card bg="secondary" style={{ width: "18rem" }}>
              <Card.Header className="text-white">Loading</Card.Header>
              <Card.Body key={timers[0].id}>
                {running === true ? (
                  <p>Running......</p>
                ) : (
                  <p>Elapsed Time: {timers[0].elapsedTime} seconds</p>
                )}
                <Button
                  variant="outline-light"
                  onClick={() => startTimer(timers[0].id)}
                >
                  Start
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => stopTimer(timers[0].id)}
                >
                  Stop
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
          <Form onSubmit={updateEnteredContainer}>
            <Form.Label>Enter Containers</Form.Label>
            <Form.Control
              placeholder="Container ID"
              size="lg"
              value={enteredContainer}
              onChange={(e) => setEnteredContainer(e.target.value)}
            />
          </Form>
        </>
      ) : (
        <>
          <CardGroup>
            <Card bg="secondary" style={{ width: "18rem" }}>
              <Card.Header className="text-white">Unloading</Card.Header>
              <Card.Body key={timers[2].id}>
                {running === true ? (
                  <p>Running......</p>
                ) : (
                  <p>Elapsed Time: {timers[2].elapsedTime} seconds</p>
                )}
                <Button
                  variant="outline-light"
                  onClick={() => startTimer(timers[2].id)}
                >
                  Start
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => stopTimer(timers[2].id)}
                >
                  Stop
                </Button>
              </Card.Body>
            </Card>
            <Card bg="secondary" style={{ width: "18rem" }}>
              <Card.Header className="text-white">Processing</Card.Header>
              <Card.Body key={timers[3].id}>
                {running === true ? (
                  <p>Running......</p>
                ) : (
                  <p>Elapsed Time: {timers[3].elapsedTime} seconds</p>
                )}
                <Button
                  variant="outline-light"
                  onClick={() => startTimer(timers[3].id)}
                >
                  Start
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => stopTimer(timers[3].id)}
                >
                  Stop
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
          <Form onSubmit={updateEnteredContainer}>
            <Form.Label>Enter Containers</Form.Label>
            <Form.Control
              placeholder="Container ID"
              size="lg"
              value={enteredContainer}
              onChange={(e) => setEnteredContainer(e.target.value)}
            />
          </Form>
        </>
      )}
      <ContainerList containers={containerList} />
    </>
  );
};

export default TransportationForm;
