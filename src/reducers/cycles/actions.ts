import { Cycle } from './reducer'

export enum CyclesActionTypes {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export function createCycleAction(cycle: Cycle) {
  return {
    type: CyclesActionTypes.CREATE_CYCLE,
    payload: cycle,
  }
}

export function interruptCycleAction() {
  return {
    type: CyclesActionTypes.INTERRUPT_CYCLE,
  }
}

export function finishCycleAction() {
  return {
    type: CyclesActionTypes.FINISH_CYCLE,
  }
}
