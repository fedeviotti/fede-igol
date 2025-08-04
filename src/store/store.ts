import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Vehicle } from '@/app/types';

type Slice = {
  vehicles: Vehicle[];
  actions: {
    setVehicles: (vehicles: Vehicle[]) => void;
  };
};

const createSlice: StateCreator<Slice> = (set) => ({
  vehicles: [],
  actions: {
    setVehicles: (vehicles) => set(() => ({ vehicles })),
  },
});

const useStore = create<Slice>()(
  devtools((...args) => ({
    ...createSlice(...args),
  }))
);

export const useVehicles = () => useStore((state) => state.vehicles);
export const useStoreActions = () => useStore((state) => state.actions);
