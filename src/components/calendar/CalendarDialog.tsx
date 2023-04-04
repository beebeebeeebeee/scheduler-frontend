import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {CalendarDialogType} from "../../types";
import React, {useCallback, useState} from "react";
import {ConfirmUtil, DateUtil} from "../../utils";
import {CalendarDialogTypeEnum, LeaveTimeEnum, LeaveTypeEnum} from "../../enums";
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {ONE_DAY_MS} from "../../constants";
import {useConfirm} from "material-ui-confirm";

type CreateDialogProps = {
    state: ReturnType<typeof useState<CalendarDialogType>>
}

export function CalendarDialog(props: CreateDialogProps) {
    const {state} = props;
    const confirm = useConfirm();

    const [value, setValue] = state;

    const _end = new Date(+(value?.end ?? 0) - ONE_DAY_MS);
    const isOneDay: boolean = +value?.start! === +_end;

    const onSubmit = useCallback(async () => {
        if (await ConfirmUtil.confirmWrapper(confirm, {
            title: `are you sure to ${value!.type === CalendarDialogTypeEnum.CREATE ? 'create' : 'update'}?`,
            dialogProps: {
                maxWidth: 'xs',
            },
            confirmationButtonProps: {
                autoFocus: true,
            }
        })) {
            setValue(value => ({...value!, done: true}));
        }
    }, [confirm, value]);

    const onClose = useCallback(async () => {
        setValue(value => ({...value!, done: false}));
    }, []);

    const onDelete = useCallback(async () => {
        if (await ConfirmUtil.confirmWrapper(confirm, {
            title: 'are you sure to delete?',
            dialogProps: {
                maxWidth: 'xs',
            },
            confirmationButtonProps: {
                autoFocus: true,
            }
        })) {
            setValue(value => ({...value!, type: CalendarDialogTypeEnum.DELETE, done: true}));
        }
    }, [confirm]);

    return <Dialog
        open={value !== undefined}
        onClose={onClose}
        fullWidth
        keepMounted
    >
        {
            value !== undefined ? <>
                <DialogTitle>
                    <Typography
                        sx={{
                            fontSize: '2.25rem',
                        }}
                    >
                        {value.type !== CalendarDialogTypeEnum.CREATE ? 'update -' : ''} leave at
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                        }}
                    >
                        {`${DateUtil.formatToDate(value.start!)}${!isOneDay ? ` ~ ${DateUtil.formatToDate(_end)}` : ''}`}
                    </Typography>
                </DialogTitle>
                <Divider/>
                <ValidatorForm
                    onSubmit={onSubmit}
                >
                    <DialogContent>
                        <Stack
                            spacing={2}
                            sx={{
                                pt: 0.75,
                            }}
                        >
                            <FormGroup>
                                <TextValidator
                                    validators={['required']}
                                    errorMessages={['name is required']}
                                    name='name'
                                    label="Your name"
                                    value={value.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(value => ({
                                        ...value!,
                                        name: e.target.value
                                    }))}
                                    size='small'
                                    fullWidth
                                    autoFocus
                                />
                            </FormGroup>
                            <Divider/>
                            <Typography>
                                Information:
                            </Typography>
                            <FormControl>
                                <FormLabel>
                                    type
                                </FormLabel>
                                <Select
                                    value={value.leaveType}
                                    size='small'
                                    onChange={(e) => setValue(value => ({...value!, leaveType: e.target.value as any}))}
                                >
                                    {
                                        Object.values(LeaveTypeEnum).map(e =>
                                            <MenuItem value={e} key={e}>{e.replace(/_/g, ' ')}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={value.planned}
                                        onChange={e => setValue(value => ({...value!, planned: e.target.checked}))}
                                    />}
                                    label="Planned"
                                />
                            </FormGroup>
                            <FormControl>
                                <FormLabel>
                                    time
                                </FormLabel>
                                <RadioGroup row>
                                    {
                                        Object.values(LeaveTimeEnum).map(e => <FormControlLabel
                                            key={e}
                                            value={e}
                                            control={<Radio
                                                checked={value.leaveTime === e}
                                                disabled={!isOneDay && e !== LeaveTimeEnum.ALL_DAY}
                                                onChange={() => setValue(value => ({...value!, leaveTime: e}))}
                                            />}
                                            label={e.replace(/_/g, ' ')}
                                        />)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            sx={{
                                width: '100%'
                            }}
                        >
                            {
                                value.type === CalendarDialogTypeEnum.UPDATE
                                    ? <Button
                                        variant="contained"
                                        color="error"
                                        onClick={onDelete}
                                    >
                                        DELETE
                                    </Button>
                                    : <div></div>
                            }
                            <Stack
                                direction='row'
                                spacing={2}
                            >
                                <Button onClick={onClose}>
                                    {
                                        value.type === CalendarDialogTypeEnum.CREATE
                                            ? 'think again'
                                            : 'dismiss'
                                    }
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type='submit'
                                >
                                    {
                                        value.type === CalendarDialogTypeEnum.CREATE
                                            ? 'leave now!'
                                            : 'Update leave'
                                    }
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogActions>
                </ValidatorForm>

            </> : <></>
        }
    </Dialog>
}