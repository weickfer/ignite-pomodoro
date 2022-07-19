import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMemo } from 'react'
import { useCycles } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export function History() {
  const { cycles } = useCycles()
  /* const sortedCycles = useMemo(() => {
    if (cycles) {
      return cycles.sort((a, b) => {
        console.log(b.startDate.getTime())
        console.log(a.startDate.getTime())

        return b.startDate.getTime() - a.startDate.getTime()
      })
    }

    return []
  }, [cycles]) */

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.interruptedDate && (
                      <TaskStatus color="red">Interrompido</TaskStatus>
                    )}
                    {cycle.finishedDate && (
                      <TaskStatus color="green">Concluído</TaskStatus>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <TaskStatus color="yellow">Em andamento</TaskStatus>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
