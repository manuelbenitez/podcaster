/**
 *  Function to refactor a Date to be displayed in the format YYYY-MM-DD
 *
 * @param {string} date - Date to be refactored
 * @returns {string} - Refactored Date
 */
export function refactorDate(date: string): string {
  const newDate = date.split("T");
  return newDate[0];
}

/**
 *  Function to refactor Episodes time in millisecond to be displayed in format HH:MM
 *
 * @param {number} milliseconds - Episode duration in milliseconds
 * @returns {string} - Refactored Episode duration
 */
export function refactorTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
  }

  return `${padTo2Digits(hours % 24)}:${padTo2Digits(minutes % 60)}`;
}

/**
 * Function to calculate the days that have passed since the last time data has been fetched
 *
 * @param {Date} lastFetched - Date object of the last time data has been fetched
 * @returns {number} - Total days that data has been fetched
 */
export function calculateDays(lastFetched: Date): number {
  const today = new Date();
  const difference = lastFetched.getTime() - today.getTime();
  const totalDays = Math.abs(difference / (1000 * 3600 * 24));

  return totalDays;
}
