import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.gray100};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

type BaseInputProps = {
  hasError?: boolean
}

const BaseInput = styled.input<BaseInputProps>`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid
    ${(props) => {
      if (props.hasError) {
        return props.theme.red500
      }

      return props.theme.green500
    }};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.gray100};

  // Hide green focus border
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.green500};
  }

  // Color of the placeholder text
  &::placeholder {
    color: ${(props) => props.theme.gray500};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  /* &::-webkit-clear-button {
    display: none !important;
  }

  &::-webkit-inner-spin-button {
    display: none !important;
  } */
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
