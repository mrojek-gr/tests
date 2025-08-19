import { getUtcStringDate } from "tasks/task3";
import { setupMockDate, MockDateSetup } from "./testUtils";

describe("task3", () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it("returns current UTC date when no argument provided", () => {
    mockDate.set({ isoDate: "2025-08-19T12:00:00Z" });

    const result = getUtcStringDate();

    expect(result).toBe("2025-08-19T12:00:00Z");
  });

  it("formats a given date in UTC", () => {
    const input = new Date("2025-08-19T12:00:00Z");
    const result = getUtcStringDate(input);

    expect(result).toBe("2025-08-19T12:00:00Z");
  });

  it("converts a local date with timezone offset to UTC", () => {
    mockDate.set({ offset: 120 });
    const localDate = new Date("2025-08-19T12:00:00Z");

    const result = getUtcStringDate(localDate);

    expect(result).toBe("2025-08-19T10:00:00Z");
  });
});
