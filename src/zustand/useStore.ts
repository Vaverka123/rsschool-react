import { create } from 'zustand';

interface StoreState {
  selectedItems: number;
}

const useStore = create<StoreState>((set) => ({
  selectedItems: 0,
  increaseSelectedItems: () =>
    set((state: StoreState) => ({ selectedItems: state.selectedItems + 1 })),
  removeAllSelectedItems: () => set({ selectedItems: 0 }),
  updateSelectedItems: (newSelectedItems: number) =>
    set({ selectedItems: newSelectedItems }),
}));

export default useStore;
