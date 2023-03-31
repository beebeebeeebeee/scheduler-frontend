import "@fontsource/aboreto"
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {ConfirmProvider} from "material-ui-confirm";
import {
    createTheme,
    ThemeProvider,
} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: '"Aboreto", cursive',
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <ConfirmProvider>
            <App/>
        </ConfirmProvider>
    </ThemeProvider>
)
