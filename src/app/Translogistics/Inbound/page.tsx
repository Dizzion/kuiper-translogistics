import InboundForm from "@/components/InboundForm";
import { ContGetAll } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Inbound = async () => {
  const containers = (await ContGetAll()) as RecordModel;
  return (
    <InboundForm
      containers={containers.items}
    />
  );
};

export default Inbound;
