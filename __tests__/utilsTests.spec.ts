import { calculateDays, refactorDate, refactorTime } from "../src/utils";

describe("calculateDays", () => {
  it("Should calculate number of days", () => {
    expect(calculateDays(new Date())).toBe(0);
    expect(calculateDays(new Date("2023-04-01"))).toBeGreaterThan(2);
  });
});

describe("refactorDate", () => {
  it("Should refactor a string to be displayed in format YYYY-MM-DD", () => {
    expect(refactorDate("2023-03-04TZ30:00:02")).toEqual("2023-03-04");
    expect(refactorDate("2023-03-04Z30:00:02")).toEqual("2023-03-04Z30:00:02");
    expect(refactorDate("T2023-03-04Z30:00:02")).toEqual("");
  });
});

describe("refactorTime", () => {
  it("Should refactor time in milliseconds to be display in format HH:MM", () => {
    expect(refactorTime(1002323345)).toEqual("14:25");
    expect(refactorTime(0)).toEqual("00:00");
  });
});
