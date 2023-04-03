import {CalendarSummaryDayType, CalendarType} from "../types";
import {LeaveTimeEnum} from "../enums";

function formatEventString(event: CalendarType): string {
    return `${event.planned ? 'Planned' : ''} ${event.leaveType} ${event.leaveTime !== LeaveTimeEnum.ALL_DAY ? `(${event.leaveTime})` : ''} - ${event.name}`;
}

function formatSummaryType(summary: CalendarSummaryDayType): string {
    const groupType = Object.entries(summary.type).map(([k, v]) => `${k}: ${v}`);
    return `${summary.count > 0 ?summary.count: '-'}${groupType.length > 0 ? ` (${groupType.join(', ')})` : ''}`
}

export default {
    formatEventString,
    formatSummaryType,
};