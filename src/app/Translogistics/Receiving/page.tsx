import ReceivingForm from "@/_components/ReceivingForm";
import { TNGetAll, getEmployees } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const Receiving = async () => {
  const employees = await getEmployees();
  const trackingNumbers = (await TNGetAll()) as RecordModel;
  return (
    <div style={{ backgroundColor: "#5d5f63" }}>
      <ReceivingForm
        employees={employees}
        trackingNumbers={trackingNumbers.items}
      />
    </div>
  );
};

export default Receiving;
