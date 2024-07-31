export const getTimeDifference = (date: string | Date): string => {
    const dueDate: Date = new Date(date);
    const currentDate: Date = new Date();

    // Convert dates to milliseconds since the Unix epoch
    const dueDateMs: number = dueDate.getTime();
    const currentDateMs: number = currentDate.getTime();

    // Calculate the difference in milliseconds
    const timeDifferenceMs: number = dueDateMs - currentDateMs;

    // Convert milliseconds to different units
    const timeDifferenceSeconds: number = Math.round(timeDifferenceMs / 1000);
    const timeDifferenceMinutes: number = Math.round(timeDifferenceMs / (1000 * 60));
    const timeDifferenceHours: number = Math.round(timeDifferenceMs / (1000 * 60 * 60));
    const timeDifferenceDays: number = Math.round(timeDifferenceMs / (1000 * 60 * 60 * 24));

    // Calculate the difference in months
    const yearDiff: number = dueDate.getFullYear() - currentDate.getFullYear();
    const monthDiff: number = dueDate.getMonth() - currentDate.getMonth();
    const timeDifferenceMonths: number = (yearDiff * 12) + monthDiff;

    let message: string;
    if (timeDifferenceSeconds < 0) {
        message = 'Task is overdue';
    } else if (timeDifferenceMinutes < 60) {
        message = `${Math.ceil(timeDifferenceMinutes)} minute${Math.ceil(timeDifferenceMinutes) !== 1 ? 's' : ''}`;
    } else if (timeDifferenceHours < 24) {
        message = `${Math.ceil(timeDifferenceHours)} hour${Math.ceil(timeDifferenceHours) !== 1 ? 's' : ''}`;
    } else if (timeDifferenceDays < 30) {
        message = `${Math.ceil(timeDifferenceDays)} day${Math.ceil(timeDifferenceDays) !== 1 ? 's' : ''}`;
    } else {
        message = `${Math.ceil(timeDifferenceMonths)} month${Math.ceil(timeDifferenceMonths) !== 1 ? 's' : ''}`;
    }

    return message;
}
export const getPriority = (priority: number) => {

    if (priority === 1) {
        return {priority: "low"}
    } else if (priority === 2) {
        return {priority: "normal"}
    } else if (priority === 3) {
        return {priority: "high"}
    } else if (priority === 4) {
        return {priority: "urgent"}
    } else {
        return;
    }
}