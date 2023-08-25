import {Calendar, Footer} from "./components";
import {AppBar, Container, CssBaseline, Divider, Toolbar, Typography} from "@mui/material";
import React from "react";

export function App() {
    return (
        <Container maxWidth={false}>
            <CssBaseline/>
            <AppBar>
                <Toolbar variant="dense">
                    <Typography sx={{
                        fontWeight: 900
                    }}>
                        Leave System（UAT）<span style={{color: '#f68484'}}>*unofficial</span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
            <Calendar/>
            <Divider
                sx={{pt: 4}}
            />
            <Footer/>
        </Container>
    );
}
