import { create } from "zustand"

export interface CounterState {
    count: number,
    incrementBy: (value: number) => void
    decrementBy: (value: number) => void
}

export const useCounterStore = create<CounterState>()((set, get) => ({
    count: 10,

    incrementBy: (value: number) => {
        set({ count: get().count + value })
    },

    decrementBy: (value: number) => {
        set({ count: get().count - value })
    }

}))