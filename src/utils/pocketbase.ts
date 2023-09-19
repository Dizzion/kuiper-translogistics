import Pocketbase, { RecordModel } from "pocketbase";

// const pb = new Pocketbase(env.APP_SERVER);
const pb = new Pocketbase("http://127.0.0.1:8090");

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

interface WarehouseAssociate {
  alias: string;
}

interface Employee {
  employee_id?: string;
  alias?: string;
  first_name?: string;
  last_name?: string;
  Full_Name?: string;
  job_title?: string;
  manager_alias?: string;
  department_name?: string;
  office_building?: string;
  default_delivery_location?: string;
  default_location?: string;
}

interface HandlingUnit {
  HU?: number;
  ToQI?: Date;
  StagedTime?: Date;
  alias?: string;
}

interface SapTote {
  ToteID: string;
  StartLoading: Date;
  StagedTime: Date;
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
  DepartureTime?: string;
  Containers?: string[];
  DepartureAA?: string;
  ArrivalAA?: string;
}

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

// * Tracking Number Routing
export const TNGetAll = async (): Promise<Object> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/TrackingNumbers/records`,
    { cache: "no-store" }
  );
  const tns = await res.json();
  return tns;
};

export const TNGetOne = async (id: string): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/TrackingNumbers/records/${id}`,
    { cache: "no-store" }
  );
  const tn = await res.json();
  return tn;
};

export const TNCreate = async (
  trackingNumber: TrackingNumber
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/TrackingNumbers/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingNumber),
    }
  );
  const newTN = await res.json();
  return newTN;
};

export const TNUpdate = async (
  id: string,
  trackingNumber: TrackingNumber
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/TrackingNumbers/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingNumber),
    }
  );
  const updatedTrackingNumber = await res.json();
  return updatedTrackingNumber;
};

// * Container Routing
export const ContGetAll = async (): Promise<Object> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Containers/records/`,
    { cache: "no-store" }
  );
  const containers = await res.json();
  return containers;
};

export const ContGetOne = async (id: string): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Containers/records/${id}?expand=TrackingNumbers,SapTotes`,
    { cache: "no-store" }
  );
  const container = await res.json();
  return container;
};

export const ContCreate = async (
  container: Container
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Containers/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(container),
    }
  );
  const newCont = await res.json();

  return newCont;
};

export const ContUpdate = async (
  id: string,
  timestamp: Date
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Containers/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UnloadFinished: timestamp,
      }),
    }
  );
  const updatedCont = await res.json();

  return updatedCont;
};

// * SapTote Routing
export const STGetAll = async (): Promise<Object> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/SapTotes/records`,
    { cache: "no-store" }
  );
  const STs = await res.json();
  return STs;
};

export const STGetOne = async (id: string): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/SapTotes/records/${id}`,
    { cache: "no-store" }
  );
  const ST = await res.json();
  return ST;
};

export const STCreate = async (tote: SapTote): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/SapTotes/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tote),
    }
  );
  const newSapTote = await res.json();

  return newSapTote;
};

export const STUpdate = async (
  id: string,
  timestamp: Date
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/SapTotes/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UnloadTime: timestamp,
      }),
    }
  );
  const updatedST = res.json();

  return updatedST;
};

// * Truck Routing
export const TruckGetAll = async (): Promise<Object> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Trucks/records`,
    { cache: "no-store" }
  );
  const trucks = await res.json();
  return trucks;
};

export const TruckGetOne = async (id: string): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Trucks/records/${id}`,
    { cache: "no-store" }
  );
  const truck = await res.json();
  return truck;
};

export const CreateTruck = async (truck: Truck): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Trucks/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(truck),
    }
  );
  const newTruck = await res.json();
  return newTruck;
};

export const UpdateTruck = async (
  id: string,
  truck: Truck
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Trucks/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(truck),
    }
  );
  const updatedTruck = await res.json();
  return updatedTruck;
};

// * Employee Routing
export const getEmployees = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("Employees").getFullList();

  return res;
};

export const addEmployees = async (
  employee: Employee
): Promise<RecordModel> => {
  const res = await pb.collection("Employees").create(employee);

  return res;
};

export const updateEmployees = async (
  id: string,
  employee: Employee
): Promise<RecordModel> => {
  const res = await pb.collection("Employees").update(id, employee);

  return res;
};

// * Associate Routing
export const getAssociates = async (): Promise<RecordModel[]> => {
  const res = await pb.collection("WarehouseAssociates").getFullList();

  return res;
};

export const addAssociate = async (
  associate: WarehouseAssociate
): Promise<RecordModel> => {
  const res = await pb.collection("WarehouseAssociates").create(associate);

  return res;
};

export const deleteAssociate = async (id: string) => {
  await pb.collection("WarehouseAssociates").delete(id);
};

// * Handling Unit Routing
export const HUGetAll = async (): Promise<Object> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/HandlingUnits/records`,
    { cache: "no-store" }
  );
  const HUs = res.json();
  return HUs;
};

export const HUGetOne = async (id: string): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/HandlingUnits/records/${id}`,
    { cache: "no-store" }
  );
  const HU = res.json();
  return HU;
};

export const HUCreate = async (
  handlingUnit: HandlingUnit
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/HandlingUnits/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handlingUnit),
    }
  );
  const newHandlingUnit = await res.json();
  return newHandlingUnit;
};

export const HUUpdate = async (
  id: string,
  handlingUnit: HandlingUnit
): Promise<RecordModel> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/HandlingUnits/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handlingUnit),
    }
  );
  const updatedHandlingUnit = await res.json();
  return updatedHandlingUnit;
};
