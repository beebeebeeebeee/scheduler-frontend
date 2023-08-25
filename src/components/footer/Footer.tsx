import {Box, Grid, Link, Typography} from "@mui/material";
import {Facebook, Instagram, Twitter} from "@mui/icons-material";
import React from "react";

const RICK_ROLL_URL = "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjGt8nxmPeAAxWFplYBHQQRDNMQwqsBegQIDhAG&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU&opi=89978449"

export default function Footer(): JSX.Element {
    return <>
        <Grid container spacing={5} sx={{pt: 2}}>
            <Grid item xs={12} sm={8}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Disclaimer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This system relies on <span style={{fontWeight: 900}}>manual input</span> data, does not include any auto sync process.<br/>
                    Data might be <span style={{fontWeight: 900}}>incorrect</span>, please don't trust me bro.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Follow Us
                </Typography>
                <Link href={RICK_ROLL_URL} color="inherit">
                    <Facebook />
                </Link>
                <Link
                    href={RICK_ROLL_URL}
                    color="inherit"
                    sx={{ pl: 1, pr: 1 }}
                >
                    <Instagram />
                </Link>
                <Link href={RICK_ROLL_URL} color="inherit">
                    <Twitter />
                </Link>
            </Grid>
        </Grid>
        <Box my={5}>
            <Typography variant="body2" color="text.secondary" align="center">
                @
                <Link href="https://beebeebeeebeee.com" color="inherit">
                    fung.mak
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    </>
}
