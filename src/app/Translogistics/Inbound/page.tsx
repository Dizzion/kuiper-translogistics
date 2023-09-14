import InboundForm from "@/_components/InboundForm";
import { ContGetAll, STGetAll, TNGetAll } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Inbound = async () => {
  const containers = (await ContGetAll()) as RecordModel;
  const trackingNumbers = (await TNGetAll()) as RecordModel;
  const sapTotes = (await STGetAll()) as RecordModel;
  return (
    <InboundForm
      containers={containers.items}
      trackingNumbers={trackingNumbers.items}
      sapTotes={sapTotes.items}
    />
  );
};

export default Inbound;
