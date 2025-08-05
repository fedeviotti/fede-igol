import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Garage, Vehicle } from '@/app/types';

type Slice = {
  vehicles: Vehicle[];
  garages: Garage[];
  actions: {
    setVehicles: (vehicles: Vehicle[]) => void;
    setGarages: (garages: Garage[]) => void;
  };
};

const createSlice: StateCreator<Slice> = (set) => ({
  vehicles: [],
  garages: [],
  actions: {
    setVehicles: (vehicles) => set(() => ({ vehicles })),
    setGarages: (garages) => set(() => ({ garages })),
  },
});

const useStore = create<Slice>()(
  devtools((...args) => ({
    ...createSlice(...args),
  }))
);

export const useVehicles = () => useStore((state) => state.vehicles);
export const useGarages = () => useStore((state) => state.garages);

export const useStoreActions = () => useStore((state) => state.actions);
