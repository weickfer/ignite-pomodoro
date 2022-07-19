import { produce } from 'immer'
import { Cycle, CyclesReducerState } from './reducer'

export function cyclesInitializer(STORAGE_KEY: string) {
  return (): CyclesReducerState => {
    const storedCycleState = localStorage.getItem(STORAGE_KEY)

    if (storedCycleState) {
      const parsedStoredCycleState = JSON.parse(storedCycleState)
      const cycles = produce(
        parsedStoredCycleState.cycles as Cycle[],
        (draft) => {
          draft.forEach((cycle) => {
            cycle.startDate = new Date(cycle.startDate)
          })
        },
      )

      return {
        cycles,
        activeCycleId: parsedStoredCycleState.activeCycleId,
      }
    }
    return {
      cycles: [],
      activeCycleId: null,
    }
  }
}
