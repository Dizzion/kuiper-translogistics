import { Bin, TrackingNumber, Truck } from "./DataFrame";

export interface TransportationFormProps {
  bins: Bin[];
  updateTrucks: (truck: Truck) => void;
}

export interface OutboundFormProps {
  bins: Bin[];
  addBin: (enteredBin: Bin) => void;
  updateOutboundTrackingNumbers: (
    enteredTrackingNumber: string,
    locationTag: string
  ) => TrackingNumber | undefined;
}

export interface InboundFormProps {
  bins: Bin[];
  updateInboundTrackingNumbers: (
    enteredTrackingNumber: string,
    locationTag: string
  ) => TrackingNumber | undefined;
}

export interface ReceivingFormProps {
  updateAsReceived: (
    enteredTrackingNumber: string,
  ) => void;
}

export interface SAPTotesProps {
  addTote: (
    id: string,
    handlingUnits: string[]
  ) => void;
}

export interface SearchProps {
  trackingNumbers: TrackingNumber[];
}

export interface SearchWarehouseProps {
  trucks: Truck[];
  bins: Bin[];
  trackingNumbers: TrackingNumber[];
}
