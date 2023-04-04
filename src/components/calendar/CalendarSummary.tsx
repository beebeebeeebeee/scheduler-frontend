import {CalendarType, UserType} from "../../types";
import React, {useCallback, useMemo, useState} from "react";
import {
    Chip,
    MenuItem,
    Paper, Select, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {CalendarStringUtil, CalendarSummaryUtil, ColorUtil} from "../../utils";
import {CalendarUserDialog} from "./CalendarUserDialog";

type CreateSummaryProps = {
    events: Array<CalendarType>;
    users: Array<UserType>;
    updateUser: (model: UserType) => Promise<void>;
}

export function CalendarSummary(props: CreateSummaryProps) {
    const {events, users, updateUser} = props;
    const [selection, setSelection] = useState<number>(new Date().getFullYear());
    const summary = useMemo(() => CalendarSummaryUtil.summary(events), [events])

    const editUserInfoState = useState<UserType>()
    const [editUserInfo, setEditUserInfo] = editUserInfoState;

    const onEditUser = useCallback((name: string) => {
        const {color} = ColorUtil.getColorByUserOrName(users, name)
        setEditUserInfo({
            name,
            color
        })
    }, [users]);

    const onSaveUser = useCallback(() => {
        if (editUserInfo != null) {
            updateUser(editUserInfo);
        }
    }, [editUserInfo]);

    return (
        <>
            <CalendarUserDialog
                state={editUserInfoState}
                onSave={() => {
                    onSaveUser();
                }}
            />
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{
                    py: 1,
                }}
            >
                <Typography>
                    summary
                </Typography>
                <Select
                    value={selection}
                    size='small'
                    onChange={(e) => setSelection(e.target.value as any)}
                >
                    {
                        Object.keys(summary).map(e =>
                            <MenuItem value={e} key={e}>{e}</MenuItem>
                        )
                    }
                </Select>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell align="right">total (days)</TableCell>
                            <TableCell align="right">solid (days)</TableCell>
                            <TableCell align="right">planned (days)</TableCell>
                            <TableCell align="right">record (rows)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(summary[selection] ?? {})?.map(([name, data]) => {
                            const {color, invert} = ColorUtil.getColorByUserOrName(users, name)
                            return (
                                <TableRow
                                    key={name}
                                >
                                    <TableCell component="th" scope="row">
                                        <Chip
                                            label={name}
                                            size="small"
                                            sx={{
                                                bgcolor: color,
                                                color: invert,
                                            }}
                                            onClick={() => onEditUser(name)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="right">{CalendarStringUtil.formatSummaryType(data.day.total)}</TableCell>
                                    <TableCell
                                        align="right">{CalendarStringUtil.formatSummaryType(data.day.solid)}</TableCell>
                                    <TableCell
                                        align="right">{CalendarStringUtil.formatSummaryType(data.day.planned)}</TableCell>
                                    <TableCell align="right">{data.row}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
