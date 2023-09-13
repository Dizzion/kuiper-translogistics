import Pocketbase, { RecordModel } from "pocketbase";

const pb = new Pocketbase(process.env.APP_SERVER);

interface TrackingNumber {
  TrackingNumber?: string;
  Outbound99?: string;
  Inbound133?: string;
  Delivered?: string;
  Received133?: string;
  Outbound133?: string;
  Inbound99?: string;
  full_name?: string;
  default_location?: string;
  CoupaPOLines?: string;
  SAP?: boolean;
  Freight?: boolean;
  Jira?: string;
  HU?: string[];
  alias: string;
}

interface SapTote {
  ToteID: string;
  StartLoading: Date;
  UnloadTime?: Date;
  HU: string[];
  alias: string;
}

interface Container {
  ContainerID?: string;
  StartTime?: Date;
  StagedTime?: Date;
  UnloadFinished?: Date;
  TrackingNumbers?: string[];
  SapTotes?: string[];
  alias: string;
}

interface Truck {
  TruckID?: string;
  ArrivalTime?: Date;
  UnloadTime?: string;
  UnloadProcessing?: string;
  LoadProcessing?: string;
  LoadTime?: string;
  DepartureTime?: Date;
  DepartureAA?: string;
  ArrivalAA?: string;
}

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

// Tracking Number Routing
export const TNGetAll = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("TrackingNumbers").getFullList();

  return res;
};

export const TNGetOne = async (id: string): Promise<RecordModel> => {
  const res = await pb.collection("TrackingNumbers").getOne(id);

  return res;
};

export const TNCreate = async (
  trackingNumber: TrackingNumber
): Promise<RecordModel> => {
  const res = await pb.collection("TrackingNumbers").create(trackingNumber);

  return res;
};

export const TNUpdate = async (
  id: string,
  trackingNumber: TrackingNumber
): Promise<RecordModel> => {
  const res = await pb.collection("TrackingNumbers").update(id, trackingNumber);

  return res;
};

// Container Routing
export const ContGetAll = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("Containers").getFullList();

  return res;
};

export const ContGetOne = async (id: string): Promise<RecordModel> => {
  const res = await pb.collection("Containers").getOne(id);

  return res;
};

export const ContCreate = async (
  container: Container
): Promise<RecordModel> => {
  const res = await pb.collection("Container").create(container);

  return res;
};

export const ContUpdate = async (
  id: string,
  timestamp: Date
): Promise<RecordModel> => {
  const res = await pb
    .collection("Container")
    .update(id, { UnloadFinish: timestamp });

  return res;
};

// SapTote Routing
export const STGetAll = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("SapTotes").getFullList();

  return res;
};

export const STGetOne = async (id: string): Promise<RecordModel> => {
  const res = await pb.collection("SapTotes").getOne(id);

  return res;
};

export const STCreate = async (tote: SapTote): Promise<RecordModel> => {
  const res = await pb.collection("SapTotes").create(tote);

  return res;
};

export const STUpdate = async (
  id: string,
  timestamp: Date
): Promise<RecordModel> => {
  const res = await pb
    .collection("SapTotes")
    .update(id, { UnloadTime: timestamp });

  return res;
};

// Truck Routing
export const TruckGetAll = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("Trucks").getFullList();

  return res;
};

export const TruckGetOne = async (id: string): Promise<RecordModel> => {
  const res = await pb.collection("Trucks").getOne(id);

  return res;
};

export const CreateTruck = async (truck: Truck): Promise<RecordModel> => {
  const res = await pb.collection("Trucks").create(truck);

  return res;
};

export const UpdateTruck = async (
  id: string,
  truck: Truck
): Promise<RecordModel> => {
  const res = await pb
    .collection("Trucks")
    .update(id, {
      ArrivalTime: truck.ArrivalTime,
      UnloadProcessing: truck.UnloadProcessing,
      UnloadTime: truck.UnloadTime,
      ArrivalAA: truck.ArrivalAA,
    });

  return res;
};

// Employee Routing

// Associate Routing
export const getAssociates =async (): Promise<RecordModel[]> => {
    const res = await pb.collection('WarehouseAssociates').getFullList();

    return res;
}

// Handling Unit Routing
export const HUCreate = async (
  handlingUnit: number,
  timestamp: Date,
  alias: string
): Promise<RecordModel> => {
  const res = await pb.collection("HandlingUnits").create({
    HU: handlingUnit,
    StagedTime: timestamp,
    alias: alias,
  });

  return res;
};

export default pb;
