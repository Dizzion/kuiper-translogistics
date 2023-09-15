import TransportationForm from "@/_components/TransportationForm";
import {
  ContGetAll,
  STGetAll,
  TNGetAll,
  TruckGetAll,
} from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Transportation = async () => {
  const trucks = (await TruckGetAll()) as RecordModel;
  const containers = (await ContGetAll()) as RecordModel;
  const trackingNumbers = (await TNGetAll()) as RecordModel;
  const sapTotes = (await STGetAll()) as RecordModel;
  return (
    <TransportationForm
      trucks={trucks.items}
      containers={containers.items}
      trackingNumbers={trackingNumbers.items}
      sapTotes={sapTotes.items}
    />
  );
};

export default Transportation;
