import {CalendarType} from "../types";
import {LeaveTimeEnum} from "../enums";

function formatEventString(event: CalendarType): string {
    return `${event.planned? 'Planned': ''} ${event.leaveType} ${event.leaveTime !== LeaveTimeEnum.ALL_DAY ? `(${event.leaveTime})` : ''} - ${event.name}`;
}

export default {formatEventString};