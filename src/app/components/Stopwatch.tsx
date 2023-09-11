import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Row className="stopwatch">
      <Col className="time text-white">{formatTime(elapsedTime)}</Col>
      <Col>
        <ButtonGroup className="controls">
          <Button variant="outline-light" type="button" onClick={handleStartStop}>
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button variant="outline-light" type="button" onClick={handleReset}>
            Reset
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default Stopwatch;