import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { produce } from 'immer'

import {
  createCycleAction,
  CyclesActionTypes,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'
import { cyclesInitializer } from '../reducers/cycles/initializer'

type CreateCycleDate = {
  task: string
  minutesAmount: number
}

type SetAmountSecondsPassed = (amountSecondsPassed: number) => void

type CycleContextData = {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId: string | null
  amountSecondsPassed: number
  setAmountSecondsPassed: SetAmountSecondsPassed
  createNewCycle: (data: CreateCycleDate) => void
  interruptCycle: () => void
  finishCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextData)

type CyclesProviderProps = {
  children: ReactNode
}

const STORAGE_KEY = '@ignite-pomodoro-1.0.0:cycle-state'

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    cyclesInitializer(STORAGE_KEY),
  )
  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }

    return 0
  })

  useEffect(() => {
    const cycleStateJSON = JSON.stringify(cycleState)

    localStorage.setItem(STORAGE_KEY, cycleStateJSON)
  }, [cycleState])

  const finishCycle = () => {
    dispatch(finishCycleAction())
  }

  const createNewCycle = (data: CreateCycleDate) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle])
    dispatch(createCycleAction(newCycle))
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setAmountSecondsPassed:
          setAmountSecondsPassed as SetAmountSecondsPassed,
        finishCycle,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycles = () => {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error('useCycles must be used within a CyclesProvider')
  }

  console.log(context)

  return context
}
