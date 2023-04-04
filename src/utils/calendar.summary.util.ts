import {CalendarSummaryType, CalendarType} from "../types";
import {ONE_DAY_MS} from "../constants";
import {LeaveTimeEnum} from "../enums";

function summary(events: Array<CalendarType>): Record<number, Record<string, CalendarSummaryType>> {
    return events.reduce<Record<number, Record<string, CalendarSummaryType>>>((previousValue, currentValue, currentIndex, array) => {
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
    }, {})
}

export default {summary};