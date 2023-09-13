import DeliveryForm from "@/app/_components/DeliveryForm";
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

  const createOnDelivered = async (enteredTrackingNumber: string) => {
    const timestamp = new Date().toLocaleString();
    try {
      await pb.collection("TrackingNumbers").create({
        TrackingNumber: enteredTrackingNumber,
        Delivered: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeliveryForm
      trackingNumbers={trackingNumbers}
      createOnDelivered={createOnDelivered}
    />
  );
}

export default Delivery;
