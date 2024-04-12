export function date(dateString, timeString) {
    // Parse input date and time
    const [month, day, year] = dateString.split('/');
    const [hours, minutes, period] = timeString.match(/(\d+):(\d+) (AM|PM)/).slice(1);
  
    // Adjust hours for 12-hour time format
    const adjustedHours = period === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
  
    // Create a Date object in UTC
    const utcDate = new Date(Date.UTC(year, month - 1, day, adjustedHours, minutes));
  
    // Convert to ISO string
    const isoString = utcDate.toISOString();
  
    return isoString;
};

export function convertFromISOString(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);
  
    // Extract date components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
  
    // Extract time components
    let hours = String(date.getUTCHours());
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    // Adjust for 12-hour time format
    let period = 'AM';
    if (hours > 12) {
        hours -= 12;
        period = 'PM';
    }
  
    // Format the time string
    const timeString = `${hours}:${minutes} ${period}`;
  
    // Construct the final date string
    const dateString = `${month}/${day}/${year}`;
  
    return `${dateString} ${timeString}`;
};

export const convertToEuropeDateFormat = (date) => {
    return date.format("DD/MM/YYYY");
}