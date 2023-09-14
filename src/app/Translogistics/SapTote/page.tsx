import SapToteForm from "@/_components/SapToteForm";
import { HUGetAll } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import React from "react";

const SapTote = async () => {
    const handlingUnits = await HUGetAll() as RecordModel;
    return (
        <SapToteForm handlingUnits={handlingUnits.items}/>
    );
};

export default SapTote;