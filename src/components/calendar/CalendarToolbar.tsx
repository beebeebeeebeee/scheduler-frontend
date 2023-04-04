import {ToolbarProps} from "react-big-calendar";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CalendarToolbar(props: ToolbarProps) {
    return (
        <>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                sx={{
                    py: '0.25rem',
                }}
            >
                <IconButton
                    onClick={() => props.onNavigate('PREV')}
                >
                    <ArrowBackIosIcon/>
                </IconButton>
                <Box
                    sx={{
                        width: '9rem',
                        textAlign: 'center',
                    }}
                >
                    <span
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={()=>props.onNavigate('TODAY')}
                    >
                        {props.label}
                    </span>
                </Box>
                <IconButton
                    onClick={() => props.onNavigate('NEXT')}
                >
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Stack>
        </>
    );
}