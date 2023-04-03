export function refactorDate(date: string): string {
  const newDate = date.split("T");
  return newDate[0];
}

export function refactorTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
  }

  return `${padTo2Digits(hours % 24)}:${padTo2Digits(minutes % 60)}`;
}

export function calculateDays(lastFetched: Date): number {
  const today = new Date();
  const difference = lastFetched.getTime() - today.getTime();
  const totalDays = Math.abs(difference / (1000 * 3600 * 24));

  return totalDays;
}
