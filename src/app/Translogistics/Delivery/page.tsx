import DeliveryForm from "@/_components/DeliveryForm";
import pb from "@/utils/pocketbase";
import React from "react";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getTrackingNumbers() {
  const data = await pb.collection("TrackingNumbers").getFullList();
  return data;
}

async function Delivery() {
  const trackingNumbers = await getTrackingNumbers();

  return (
    <div style={{ backgroundColor: "#5d5f63" }}>
      <DeliveryForm
        trackingNumbers={trackingNumbers}
      />
    </div>
  );
}

export default Delivery;
