export class Format {
    // Example: `3:43 pm`
    static time(timestamp) {
        return FromDate.getTimeWithAmPm(new window.Date(+timestamp));
    }
    // Example: `3:43:15 pm`
    static timeWithSeconds(timestamp) {
        return FromDate.getTimeWithSecondsAndAmPm(new window.Date(+timestamp));
    }
    // Example: `Feb 3rd`
    // If year differs from current year, `Feb 3rd, 2022`
    static date(timestamp) {
        timestamp = +timestamp;
        const date = new window.Date(timestamp);
        let output = `${FromDate.getShortMonth(date)} ${FromDate.getDayOfMonth(date)}`;
        if (date.getFullYear() !== new Date().getFullYear()) {
            output += ` ${date.getFullYear()}`;
        }
        return output;
    }
    // Example: `Feb 3rd, 8:13 am`
    static dateAndTime(timestamp) {
        timestamp = +timestamp;
        const date = new window.Date(timestamp);
        return `${FromDate.getShortMonth(date)} ${FromDate.getDayOfMonth(date)}, ${FromDate.getTimeWithAmPm(date)}`;
    }
    // Example: `Feb 3, 8:13a`
    static dateAndTimeCompact(timestamp) {
        timestamp = +timestamp;
        const date = new window.Date(timestamp);
        return `${FromDate.getShortMonth(date)} ${date.getDate()}, ${FromDate.getTimeWithCompactAmPm(date)}`;
    }
    // Example: `5 days, 13 hours, 38 minutes, 3 seconds`
    static durationLong(timestamp1, timestamp2) {
        const startTimestamp = Math.min(+timestamp1, +timestamp2);
        const endTimestamp = Math.max(+timestamp1, +timestamp2);
        let secondsOfDuration = Difference.seconds(startTimestamp, endTimestamp);
        let durationSections = [];
        const days = Math.floor(secondsOfDuration / 86400); // 60 seconds, 60 minutes, 24 hours
        if (days > 0) {
            durationSections.push(`${days} day${days > 1 ? `s` : ``}`);
            secondsOfDuration -= (days * 86400);
        }
        const hours = Math.floor(secondsOfDuration / 3600);
        if (hours > 0) {
            durationSections.push(`${hours} hour${hours > 1 ? `s` : ``}`);
            secondsOfDuration -= (hours * 3600);
        }
        const minutes = Math.floor(secondsOfDuration / 60);
        if (minutes > 0) {
            durationSections.push(`${minutes} minute${minutes > 1 ? `s` : ``}`);
            secondsOfDuration -= (minutes * 60);
        }
        const seconds = Math.floor(secondsOfDuration);
        if (seconds > 0) {
            durationSections.push(`${seconds} second${seconds > 1 ? `s` : ``}`);
        }
        return durationSections.join(`, `);
    }
    // Example: "Feb 11th" or "Feb 11th - Feb 21st"
    static dateRange(timestamp1, timestamp2) {
        const startDate = Format.date(timestamp1);
        const endDate = Format.date(timestamp2);
        return startDate === endDate ? startDate : startDate + ` - ` + endDate;
    }
}
export class FromDate {
    // Example: `Mon`
    static getShortDay(date) {
        return date.toDateString().split(` `)[0];
    }
    // Example: `Feb`
    static getShortMonth(date) {
        return date.toDateString().split(` `)[1];
    }
    // Example: `3rd`
    static getDayOfMonth(date) {
        const dateNumber = date.getDate();
        let suffix = `th`;
        if ([1, 21, 31].includes(dateNumber)) {
            suffix = `st`;
        }
        if ([2, 22].includes(dateNumber)) {
            suffix = `nd`;
        }
        if ([3, 23].includes(dateNumber)) {
            suffix = `rd`;
        }
        return `${dateNumber}${suffix}`;
    }
    // Example: `8:13 am`
    static getTimeWithAmPm(date) {
        const parts = date.toLocaleString().split(` `);
        const time = `${parts[1].split(':')[0]}:${parts[1].split(':')[1]}`;
        const amPm = parts[2].toLowerCase();
        return `${time} ${amPm}`;
    }
    // Example: `8:13p`
    static getTimeWithCompactAmPm(date) {
        const parts = date.toLocaleString().split(` `);
        const time = `${parts[1].split(':')[0]}:${parts[1].split(':')[1]}`;
        const amPm = parts[2].toLowerCase();
        return `${time}${amPm.charAt(0)}`;
    }
    // Example: `8:13:42 am`
    static getTimeWithSecondsAndAmPm(date) {
        const parts = date.toLocaleString().split(` `);
        const amPm = parts[2].toLowerCase();
        return `${parts[1]} ${amPm}`;
    }
}
export class Difference {
    static seconds(startTimestamp, endTimestamp) {
        return (+endTimestamp - +startTimestamp) / 1000;
    }
    static days(startTimestamp, endTimestamp) {
        return (+endTimestamp - +startTimestamp) / 86400000;
    }
}
export class Shift {
    static seconds(timestamp, secondsDifference) {
        return timestamp + (secondsDifference * 1000);
    }
    static minutes(timestamp, minutesDifference) {
        return timestamp + (minutesDifference * 60000);
    }
}
