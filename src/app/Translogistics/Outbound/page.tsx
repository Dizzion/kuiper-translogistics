import OutboundForm from "@/_components/OutboundForm";
import { STGetAll, TNGetAll } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Outbound = async () => {
  const trackingNumbers = (await TNGetAll()) as RecordModel;
  const sapTotes = (await STGetAll()) as RecordModel;
  return (
    <OutboundForm
      sapTotes={sapTotes.items}
      trackingNumbers={trackingNumbers.items}
    />
  );
};

export default Outbound;
