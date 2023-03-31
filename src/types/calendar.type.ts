import {CalendarDialogTypeEnum, LeaveTimeEnum, LeaveTypeEnum} from "../enums";

export type CalendarType = {
    id: number,
    name: string,
    planned: boolean,
    leaveType: LeaveTypeEnum,
    leaveTime: LeaveTimeEnum,
    start: Date,
    end: Date,
}

export type CalendarDialogType = Omit<CalendarType, 'id'> & {
    id?: number,
    type: CalendarDialogTypeEnum,
    done?: boolean,
}

export type ApiCalendarType = Omit<CalendarType, 'id' | 'start' | 'end'> & {
    start: string,
    end: string,
};
