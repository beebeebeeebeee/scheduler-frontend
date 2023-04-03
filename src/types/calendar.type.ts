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

export type ApiGetCalendarType = Omit<CalendarType, 'start' | 'end'> & {
    start: string,
    end: string,
};


export type ApiCalendarType = Omit<CalendarType, 'id' | 'start' | 'end'> & {
    start: string,
    end: string,
};

export type CalendarSummaryType = {
    row: number;
    day: {
        total: CalendarSummaryDayType;
        solid: CalendarSummaryDayType;
        planned: CalendarSummaryDayType;
    }
    events: Array<CalendarType>;
}

export type CalendarSummaryDayType = {
    count: number;
    type: Partial<Record<LeaveTypeEnum, number>>;
}