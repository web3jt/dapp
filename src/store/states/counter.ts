import { StateCreator } from 'zustand';
import { produce } from 'immer';

export interface ICounter {
  count: number;
  counterIncreasement: () => void;
  counter2: () => number;
}

export const createCount: StateCreator<ICounter> = (set, get) => ({
  count: 0,
  counterIncreasement() {
    set(produce((state: ICounter) => ({ count: state.count + 1 })))
  },

  counter2() {
    const value = get().count + 1;
    return value;
  }
})
