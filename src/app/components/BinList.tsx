// components/BinList.tsx
import React from "react";
import { Bin } from "../utils/DataFrame";
import { ListGroup } from "react-bootstrap";
import DisplayBin from "./subcomponents/DisplayBin";

interface BinListProps {
  bins: Bin[];
}

const BinList: React.FC<BinListProps> = ({ bins }) => {
  
  return (
    <div>
      <h3 className="text-white">Containers: {bins.length}</h3>
      <ListGroup>
        {bins.map((bin) => (
          <ListGroup.Item variant="dark" key={bin.id}>
            <DisplayBin bin={bin}/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BinList;