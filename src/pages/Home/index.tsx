import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useCycles } from '../../contexts/CyclesContext'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import { HomeContainer, StartCycleButton, StopCycleButton } from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCycle } = useCycles()
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisable = !task

  const handleCreateNewCycle = handleSubmit((data) => {
    createNewCycle(data)
    reset()
  })

  return (
    <HomeContainer>
      <form onSubmit={handleCreateNewCycle}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCycleButton onClick={interruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCycleButton>
        ) : (
          <StartCycleButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCycleButton>
        )}
      </form>
    </HomeContainer>
  )
}
