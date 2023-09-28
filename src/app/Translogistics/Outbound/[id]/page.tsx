import React from "react";
import OutboundUpdate from "@/components/OutboundUpdate";

const OutboundContainerUpdate = async ({ params }: { params: { id: string }}) => {
  return (
    <OutboundUpdate id={params.id}/>
  );
};

export default OutboundContainerUpdate;