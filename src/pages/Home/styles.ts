import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCycleButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    filter: opacity(0.7);
    cursor: not-allowed;
  }
`

export const StartCycleButton = styled(BaseCycleButton)`
  background: ${(props) => props.theme.green500};
  color: ${(props) => props.theme.gray100};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.green700};
  }
`

export const StopCycleButton = styled(BaseCycleButton)`
  background: ${(props) => props.theme.red500};
  color: ${(props) => props.theme.gray100};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.red700};
  }
`
