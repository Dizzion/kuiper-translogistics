import Pocketbase, { RecordModel } from 'pocketbase';

const pb = new Pocketbase(process.env.APP_SERVER);

interface TrackingNumber {
    TrackingNumber: string;
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

// Tracking Number Routing
export const TNGetAll = async (): Promise<RecordModel[]> => {
    const res = await pb.collection('TrackingNumbers').getFullList();
    
    return res;
}

export const TNGetOne = async (id: string): Promise<RecordModel> => {
    const res = await pb.collection('TrackingNumbers').getOne(id);

    return res;
}

export const TNCreate = async (trackingNumber: TrackingNumber): Promise<RecordModel> => {
    const res = await pb.collection('TrackingNumbers').create(trackingNumber);

    return res;
}

export const TNUpdate = async (id: string, trackingNumber: TrackingNumber): Promise<RecordModel> => {
    const res = await pb.collection('TrackingNumbers').update(id, trackingNumber);

    return res;
}

// Container Routing

// SapTote Routing
export const STGetAll = async (): Promise<RecordModel[]> => {
    const res = await pb.collection('SapTotes').getFullList();

    return res;
}

export const STGetOne = async (id: string): Promise<RecordModel> => {
    const res = await pb.collection('SapTotes').getOne(id);

    return res;
}

export const STCreate = async (tote: SapTote): Promise<RecordModel> => {
    const res = await pb.collection('SapTotes').create(tote);

    return res;
}

export const STUpdate = async (id: string, timestamp: Date): Promise<RecordModel> => {
    const res = await pb.collection('SapTotes').update(id, { UnloadTime: timestamp});

    return res;
}

// Truck Routing

// Employee Routing

// Associate Routing

// Handling Unit Routing
export const HUCreate = async (handlingUnit: number, timestamp: Date, alias: string): Promise<RecordModel> => {
    const res = await pb.collection('HandlingUnits').create({
        HU: handlingUnit,
        StagedTime: timestamp,
        alias: alias
    });

    return res;
}

export default pb;