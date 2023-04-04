import './style.css';

import {
    Calendar as BigCalendar,
    dayjsLocalizer,
    Event,
    SlotInfo,
    Views,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import {useCallback, useEffect, useState} from "react";
import {CalendarStringUtil, ColorUtil, DateUtil, StringUtil} from "../../utils";
import {
    CalendarDialogType,
    CalendarType,
    ApiCalendarType,
    GovHolidayApiVeventType, UserType,
} from "../../types";
import {CalendarDialogTypeEnum, LeaveTimeEnum, LeaveTypeEnum,} from "../../enums";
import {CalendarDialog} from "./CalendarDialog";
import {CalendarService, HolidayService, UserService} from "../../services";
import {CalendarSummary} from "./CalendarSummary";
import {Box, Divider} from "@mui/material";
import CalendarToolbar from "./CalendarToolbar";
import * as React from "react";

const localizer = dayjsLocalizer(dayjs);

export default function Calendar() {
    const [signal, setSignal] = useState<AbortSignal>();

    const [events, setEvents] = useState<Array<CalendarType>>([]);
    const [holidays, setHolidays] = useState<GovHolidayApiVeventType[]>([]);
    const [users, setUsers] = useState<Array<UserType>>([]);

    const dialogDataState = useState<CalendarDialogType>();
    const [dialogData, setDialogData] = dialogDataState;

    const toggleCreateDialog = useCallback(({start, end}: SlotInfo) => {
        setDialogData({
            name: '',
            planned: false,
            leaveType: LeaveTypeEnum.ANNUAL_LEAVE,
            leaveTime: LeaveTimeEnum.ALL_DAY,
            start,
            end,
            type: CalendarDialogTypeEnum.CREATE,
        })
    }, []);

    const toggleUpdateDialog = useCallback(({resource}: Event) => {
        if (resource == null) {
            return;
        }
        setDialogData({
            ...events[resource],
            type: CalendarDialogTypeEnum.UPDATE,
        })
    }, [events]);

    const getEvent = useCallback(async (_signal?: AbortSignal) => {
        const data = await CalendarService.getCalendar(_signal ?? signal);
        setEvents(data.map(e => ({
            ...e,
            start: DateUtil.dataToDate(e.start),
            end: DateUtil.dataToDate(e.end),
        })));
    }, [signal]);

    const getUser = useCallback(async (_signal?: AbortSignal) => {
        const data = await UserService.getUser(_signal ?? signal);
        setUsers(data);
    }, [signal])

    const createEvent = useCallback(async (model: ApiCalendarType) => {
        await CalendarService.createCalendar(model, signal);
        await getEvent();
    }, [signal]);

    const updateEvent = useCallback(async (id: number, model: ApiCalendarType) => {
        await CalendarService.updateCalendar(id, model, signal);
        await getEvent();
    }, [signal]);

    const updateUser = useCallback(async (model: UserType) => {
        const data = await UserService.updateUser(model, signal);
        await getUser();
    }, [signal])

    const deleteEvent = useCallback(async (id: number) => {
        await CalendarService.deleteCalendar(id, signal);
        await getEvent();
    }, [signal]);

    useEffect(() => {
        if (dialogData?.done === false) {
            setDialogData(undefined);
        } else if (dialogData?.done === true) {
            setDialogData(undefined);

            switch (dialogData.type) {
                case CalendarDialogTypeEnum.CREATE: {
                    void createEvent({
                        name: dialogData.name?.toUpperCase(),
                        planned: dialogData.planned,
                        leaveType: dialogData.leaveType,
                        leaveTime: dialogData.leaveTime,
                        start: DateUtil.dateToData(dialogData.start),
                        end: DateUtil.dateToData(dialogData.end),
                    })
                    break;
                }
                case CalendarDialogTypeEnum.UPDATE: {
                    console.log(dialogData);
                    void updateEvent(dialogData.id!, {
                        name: dialogData.name?.toUpperCase(),
                        planned: dialogData.planned,
                        leaveType: dialogData.leaveType,
                        leaveTime: dialogData.leaveTime,
                        start: DateUtil.dateToData(dialogData.start),
                        end: DateUtil.dateToData(dialogData.end),
                    })
                    break;
                }
                case CalendarDialogTypeEnum.DELETE: {
                    void deleteEvent(dialogData.id!);
                    break;
                }
            }
        }
    }, [dialogData?.done]);

    useEffect(() => {
        const controller = new AbortController();
        setSignal(controller.signal);

        HolidayService.getHoliday(controller.signal).then((value: GovHolidayApiVeventType[]) => {
            setHolidays(value);
        })

        void getEvent(controller.signal);

        void getUser(controller.signal);

        return () => {
            controller.abort();
        }
    }, [])

    return <>
        <CalendarDialog
            state={dialogDataState}
        />
        <BigCalendar
            localizer={localizer}
            events={[
                ...events.map((e, i) => ({
                    title: CalendarStringUtil.formatEventString(e),
                    start: e.start,
                    end: e.end,
                    allDay: true,
                    resource: i,
                })),
                ...(holidays?.map((e) => ({
                    title: e.summary,
                    start: StringUtil.holidayStringToDate(e.dtstart[0]),
                    end: StringUtil.holidayStringToDate(e.dtend[0], true)
                })) ?? [])
            ]}
            eventPropGetter={(e) => {
                const event = events[e.resource];
                const {
                    color,
                    invert
                } = ColorUtil.getColorByUserOrName(users, event?.name ?? 'holiday');

                return {
                    className: `event-${event?.leaveTime ?? 'holiday'}`,
                    style: {
                        ...event == null ? {
                            cursor: 'default',
                            color: 'red',
                            backgroundColor: '#ffffff00',
                        } : {
                            backgroundColor: color,
                            color: invert,
                        }
                    }
                }
            }}
            startAccessor="start"
            endAccessor="end"
            style={{height: '80vh'}}
            views={[Views.MONTH]}
            onSelectSlot={toggleCreateDialog}
            onSelectEvent={toggleUpdateDialog}
            selectable
            showAllEvents
            components={{
                toolbar: CalendarToolbar,
            }}
        />
        <Divider
            sx={{pt: 2}}
        />
        <CalendarSummary
            events={events}
            users={users}
            updateUser={updateUser}
        />
    </>
}
