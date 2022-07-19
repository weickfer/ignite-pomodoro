import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycles } from '../../../../contexts/CyclesContext'
import { CountdownContainer, InnerCounter } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    finishCycle,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle && Number(minutes) !== 0) {
      document.title = `Ignite Pomodoro | Restam ${minutes} minutos.`

      return
    }

    if (activeCycle && Number(minutes) === 0) {
      document.title = `Ignite Pomodoro | Restam ${seconds} segundos.`

      return
    }

    if (!activeCycle) {
      document.title = `Ignite Pomodoro`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          finishCycle()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setAmountSecondsPassed,
    finishCycle,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <InnerCounter>:</InnerCounter>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
