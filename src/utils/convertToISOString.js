export function convertToISOString(dateString, timeString) {
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