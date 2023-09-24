import React, { useState } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { RecordModel } from "pocketbase";
import HandlingUnitList from "./HandlingUnitList";
import { HUGetOne } from "@/utils/pocketbase";

interface SapToteItemProps {
  SapTote: RecordModel;
}

const DisplaySapTote: React.FC<SapToteItemProps> = ({ SapTote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hus, setHus] = useState<number[]>([]);

  const toggleExpandCollapse = async () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      const huArray = SapTote.HU;
      for await (const i of huArray) {
        const hu = await HUGetOne(i);
        setHus([...hus, hu.HU]);
      }
    } else {
      setHus([]);
    }
  };

  return (
    <ListGroup.Item
      variant={isExpanded ? "light" : "dark"}
      onClick={toggleExpandCollapse}
      key={SapTote.id}
    >
      SapTote ID: {SapTote.ToteID}
      {isExpanded && <HandlingUnitList handlingUnits={hus} />}
    </ListGroup.Item>
  );
};

export default DisplaySapTote;
