import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './contexts/CyclesContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <Router />
      </CyclesProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
