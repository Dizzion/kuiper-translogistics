import TransportationForm from "@/_components/TransportationForm";
import {
  ContGetAll,
  TruckGetAll,
} from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Transportation = async () => {
  const trucks = (await TruckGetAll()) as RecordModel;
  const containers = (await ContGetAll()) as RecordModel;
  return (
    <TransportationForm
      trucks={trucks.items}
      containers={containers.items}
    />
  );
};

export default Transportation;
