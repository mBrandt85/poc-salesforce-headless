import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { blue, grey } from '@mui/material/colors'

interface MuiProviderProps {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700]
    }
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          color: grey[800],
          boxShadow: 'none'
        }
      }
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          padding: '0 12px',
          borderBottomColor: grey[300],
          borderBottomStyle: 'solid',
          borderBottomWidth: 1
        }
      }
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          color: grey[500],
          fontSize: 15,

          '&.Mui-selected': {
            color: grey[800]
          }
        }
      }
    }
  }
})

export default function MuiProvider({ children }: MuiProviderProps) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
}