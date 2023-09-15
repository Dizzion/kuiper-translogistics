import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import DisplayContainer from "./DisplayContainer";

interface ContainerListProps {
  containers: RecordModel[];
  trackingNumbers: RecordModel[];
  sapTotes: RecordModel[];
}

const ContainerList: React.FC<ContainerListProps> = ({
  containers,
  trackingNumbers,
  sapTotes,
}) => {

  return (
    <>
      <h3 className="text-white">Containers: {containers.length}</h3>
      <ListGroup>
        {containers.map((cont) => (
          <ListGroup.Item variant="dark" key={cont.id}>
            <DisplayContainer
              container={cont}
              trackingNumbers={trackingNumbers}
              sapTotes={sapTotes}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ContainerList;
