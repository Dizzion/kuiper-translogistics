import { STGetAll, TNGetAll } from "@/utils/pocketbase";
import React from "react";

const Outbound = async () => {
    const trackingNumbers = await TNGetAll();
    const sapTotes = await STGetAll();
    return (
        <div>Outbound Form</div>
    );
};

export default Outbound;