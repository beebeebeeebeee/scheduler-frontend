import {CalendarSummaryType, CalendarType} from "../../types";
import {ONE_DAY_MS} from "../../constants";
import {LeaveTimeEnum, LeaveTypeEnum} from "../../enums";
import React, {useState} from "react";
import {
    FormControl, FormLabel, MenuItem,
    Paper, Select, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {CalendarStringUtil} from "../../utils";

type CreateSummaryProps = {
    events: Array<CalendarType>;
}

export function CalendarSummary(props: CreateSummaryProps) {
    const {events} = props;
    const [selection, setSelection] = useState<number>(new Date().getFullYear());

    const summary = events.reduce<Record<number, Record<string, CalendarSummaryType>>>((previousValue, currentValue, currentIndex, array) => {
        const year: number = currentValue.start.getFullYear();
        const {name, leaveType} = currentValue;

        if (previousValue[year] == null) {
            previousValue[year] = {}
        }

        if (previousValue[year][name] == null) {
            previousValue[year][name] = {
                row: 0,
                day: {
                    total: {
                        count: 0,
                        type: {},
                    },
                    solid: {
                        count: 0,
                        type: {},
                    },
                    planned: {
                        count: 0,
                        type: {},
                    },
                },
                events: [],
            };
        }

        let day = (+currentValue.end - +currentValue.start) / ONE_DAY_MS;
        if (day === 1 && (currentValue.leaveTime !== LeaveTimeEnum.ALL_DAY)) {
            day = 0.5;
        }

        previousValue[year][name].day.total.count += day;
        previousValue[year][name].day.total.type[leaveType] =
            (previousValue[year][name].day.total.type[leaveType] ?? 0) + day;
        if (currentValue.planned) {
            previousValue[year][name].day.planned.count += day;
            previousValue[year][name].day.planned.type[leaveType] =
                (previousValue[year][name].day.planned.type[leaveType] ?? 0) + day;
        } else {
            previousValue[year][name].day.solid.count += day;
            previousValue[year][name].day.solid.type[leaveType] =
                (previousValue[year][name].day.solid.type[leaveType] ?? 0) + day;
        }

        previousValue[year][name].row++;
        previousValue[year][name].events.push(currentValue)

        return previousValue;
    }, {});

    return (
        <>
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
                            <MenuItem value={e}>{e}</MenuItem>
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
                        {Object.entries(summary[selection] ?? {})?.map(([name, data]) => (
                            <TableRow
                                key={name}
                            >
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell align="right">{CalendarStringUtil.formatSummaryType(data.day.total)}</TableCell>
                                <TableCell align="right">{CalendarStringUtil.formatSummaryType(data.day.solid)}</TableCell>
                                <TableCell align="right">{CalendarStringUtil.formatSummaryType(data.day.planned)}</TableCell>
                                <TableCell align="right">{data.row}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
