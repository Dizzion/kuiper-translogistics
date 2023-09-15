"use client";
import { CreateTruck, UpdateTruck } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React, { useState } from "react";

interface TransportationFormProps {
  trucks: RecordModel[];
  containers: RecordModel[];
  trackingNumbers: RecordModel[];
  sapTotes: RecordModel[];
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
  trackingNumbers,
  sapTotes,
}) => {
  const [truckId, setTruckId] = useState("");
  const [locationTag, setLocationTag] = useState("");
  const [loadOrUnload, setLoadOrUnload] = useState("");
  const [enteredContainer, setEnteredContainer] = useState("");
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
    if (loadOrUnload === "unload") {
      const record = {
        TruckID: truckId,
        ArrivalTime: arrivalTime,
        UnloadTime: timers[2].elapsedTime.toLocaleString(),
        UnloadProcessing: timers[3].elapsedTime.toLocaleString(),
        ArrivalAA: localStorage.getItem("id") as string,
      };
      const truckIndex = trucks.findIndex((obj) => obj.Containers === containerIds);
      if( truckIndex === -1) {
        return;
      }
      await UpdateTruck(trucks[truckIndex].id, record);
      setArrivalTime(new Date());
      setContainerIds([]);
      setContainerList([]);
      setEnteredContainer("");
      setLoadOrUnload("");
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
      setTruckId('');
    } else if (loadOrUnload === "load") {
      const record = {
        TruckID: truckId,
        LoadProcessing: timers[1].elapsedTime.toLocaleString(),
        LoadTime: timers[0].elapsedTime.toLocaleString(),
        DepartureTime: new Date(),
        DepartureAA: localStorage.getItem("id") as string,
      };
      await CreateTruck(record);
      setArrivalTime(new Date());
      setContainerIds([]);
      setContainerList([]);
      setEnteredContainer("");
      setLoadOrUnload("");
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
      setTruckId('');
    }
  };

  const updateEnteredContainer = (value: string) => {
    setEnteredContainer(value);
    const contIndex = containers.findIndex(
      (obj) => obj.ContainerID === enteredContainer
    );
    if (contIndex !== -1) {
      setContainerList([...containerList, containers[contIndex]]);
    }
  };

  return <div>TransportationForm</div>;
};

export default TransportationForm;
