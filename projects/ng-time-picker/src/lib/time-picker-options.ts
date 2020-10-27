export enum TimeFormat {
    time24 = "HH:mm",
    time12A = "hh:mm:A",
    time12a = "hh:mm:a"
}

export const Time12HrFormatOptions = [
    {
        id: "am",
        value: "am",
        format: TimeFormat.time12a
    },
    {
        id: "pm",
        value: "pm",
        format: TimeFormat.time12a
    },
    {
        id: "AM",
        value: "AM",
        format: TimeFormat.time12A
    },
    {
        id: "PM",
        value: "PM",
        format: TimeFormat.time12A
    }
]