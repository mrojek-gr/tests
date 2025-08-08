import { validateUserName } from "tasks/task1/index";
import { fetchIsUserNameAvailable } from "tasks/task1/fetchIsUserNameValid";

jest.mock("tasks/task1/fetchIsUserNameValid", () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

const mockedFetch = jest.mocked(fetchIsUserNameAvailable);

describe("userNameValidation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns false if name has length less than 3 symbols", async () => {
    const result = await validateUserName("Ma");
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("returns false if name has not only alphanumeric symbols", async () => {
    const result = await validateUserName("Mateusz!");
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("returns false if name contains spaces", async () => {
    const result = await validateUserName("Ma teusz");
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("returns false if name starts with number", async () => {
    const result = await validateUserName("1Mateusz");
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("returns false if name is not unique", async () => {
    mockedFetch.mockResolvedValueOnce(false);
    const result = await validateUserName("Mateusz");
    expect(mockedFetch).toHaveBeenCalledWith("Mateusz");
    expect(result).toBe(false);
  });

  it("returns true if name is unique", async () => {
    mockedFetch.mockResolvedValueOnce(true);
    const result = await validateUserName("Mateusz");
    expect(mockedFetch).toHaveBeenCalledWith("Mateusz");
    expect(result).toBe(true);
  });

  it("returns false if fetchIsUserNameAvailable throws exception", async () => {
    mockedFetch.mockImplementationOnce(() => {
      throw new Error("Sync failure");
    });
    const result = await validateUserName("Mateusz");
    expect(mockedFetch).toHaveBeenCalledWith("Mateusz");
    expect(result).toBe(false);
  });
});
