import { produce } from 'immer'
import { CyclesActionTypes } from './actions'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type CyclesReducerState = {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesReducerState, action: any) {
  switch (action.type) {
    case CyclesActionTypes.CREATE_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case CyclesActionTypes.INTERRUPT_CYCLE: {
      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      return produce(state, (draft) => {
        draft.cycles[activeCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case CyclesActionTypes.FINISH_CYCLE: {
      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      return produce(state, (draft) => {
        draft.cycles[activeCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
