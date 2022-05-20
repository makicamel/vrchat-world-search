import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    divider: '#fff',
    background: {
      default: '#1b2025',
      paper: '#333c46',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: 'Dosis,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif'
  }
})


export default theme;
