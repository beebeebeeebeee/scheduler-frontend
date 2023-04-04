import {CalendarDialogType, CalendarSummaryType, CalendarType, UserType} from "../../types";
import {ONE_DAY_MS} from "../../constants";
import {CalendarDialogTypeEnum, LeaveTimeEnum, LeaveTypeEnum} from "../../enums";
import React, {useCallback, useMemo, useState} from "react";
import {
    Button,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle,
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
import {CalendarStringUtil, CalendarSummaryUtil, ColorUtil, ConfirmUtil} from "../../utils";
import {SketchPicker} from "react-color";
import {useConfirm} from "material-ui-confirm";

type CalendarUserDialogProps = {
    state: ReturnType<typeof useState<UserType>>;
    onSave: () => Promise<void> | void;
}

export function CalendarUserDialog(props: CalendarUserDialogProps) {
    const confirm = useConfirm();
    const {state} = props;
    const [editUserInfo, setEditUserInfo] = state;

    const onSave = useCallback(async () => {
        if (await ConfirmUtil.confirmWrapper(confirm, {
            title: 'are you sure to save?',
            dialogProps: {
                maxWidth: 'xs',
            },
            confirmationButtonProps: {
                autoFocus: true,
            }
        })) {
            await props.onSave();
            clear();
        }
    }, [confirm, props.onSave]);

    const clear = useCallback(() => {
        setEditUserInfo(undefined);
    }, [])

    return (
        <Dialog
            open={editUserInfo != null}
            onClose={clear}
        >
            {
                editUserInfo != null
                    ? <>
                        <DialogTitle>
                            <Chip
                                label={editUserInfo.name}
                                size="small"
                                sx={{
                                    bgcolor: editUserInfo.color,
                                    color: ColorUtil.invertColor(editUserInfo.color),
                                }}
                            />
                        </DialogTitle>
                        <DialogContent>

                            <SketchPicker
                                color={editUserInfo.color}
                                onChange={(color) => {
                                    setEditUserInfo((editUserInfo: any) => ({
                                        ...editUserInfo,
                                        color: color.hex,
                                    }))
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={clear}
                            >
                                dismiss
                            </Button>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </> : <></>
            }
        </Dialog>
    )
}
