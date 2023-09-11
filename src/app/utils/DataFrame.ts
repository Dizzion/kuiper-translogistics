export interface TrackingNumber {
    id: string;
    timestamp1: string;
    timestamp2: string;
    timestamp3: string;
    timestamp4: string;
    timestamp5: string;
    handlingUnits?: number[];
    coupaPoLines?: string;
    requestorName?: string;
    requestorBuilding?: string;
    sap?: boolean;
    freight?: boolean;
  }
  
  export interface Bin {
    id: string;
    startTime?: string;
    stagedTime?: string;
    contents: TrackingNumber[];
  }
  
  export interface Truck {
    id: string; 
    bins: Bin[];
    arrivalTime?: string;
    loadTime?: string;
    loadProcessing?: string;
    unloadTime?: string;
    unloadProcessing?: string;
    departureTime?: string;
  }
  
  export interface SapTote {
    id: string;
    handlingUnits: string[];
    startLoading?: string;
    stagedTime?: string;
  }
  
  export interface HandlingUnit {
    id: string;
    stagedTime?: string;
  }