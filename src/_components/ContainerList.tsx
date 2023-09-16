import { RecordModel } from "pocketbase";
import React from "react";
import { ListGroup } from "react-bootstrap";
import DisplayContainer from "./DisplayContainer";

interface ContainerListProps {
  containers: RecordModel[];
}

const ContainerList: React.FC<ContainerListProps> = ({
  containers,
}) => {
  return (
    <>
      <h3 className="text-white">Containers: {containers.length}</h3>
      <ListGroup>
        {containers.map((cont) => (
          <ListGroup.Item variant="dark" key={cont.id}>
            <DisplayContainer
              container={cont}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ContainerList;
