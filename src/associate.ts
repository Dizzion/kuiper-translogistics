import { RecordModel } from 'pocketbase';
import { create } from 'zustand'

type StoreState = {
    associate: RecordModel | undefined;
    setAssociate: (record: RecordModel) => void;
    clearAssociate: () => void;
}

const useStore = create<StoreState>((set) => ({
  associate: undefined,
  setAssociate: (record) => set((state) => {associate: record})
}))
