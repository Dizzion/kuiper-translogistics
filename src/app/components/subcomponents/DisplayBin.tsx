import React, { useState } from "react";
import { Bin } from "../../utils/DataFrame";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TrackingNumberList from "../TrackingNumberList";

interface BinItemProps {
  bin: Bin; // Define your bin type as needed
}

const DisplayBin: React.FC<BinItemProps> = ({ bin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ListGroup.Item
      variant={isExpanded ? "light" : "dark"}
      onClick={toggleExpandCollapse}
      key={bin.id}
    >
      Bin ID: {bin.id}
      {isExpanded && <TrackingNumberList trackingNumbers={bin.contents} />}
    </ListGroup.Item>
  );
};

export default DisplayBin;