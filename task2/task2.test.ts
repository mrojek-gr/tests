import { QuantityValidator } from "tasks/task2";

describe("QuantityValidator", () => {
  it("treshold valid", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(6);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("error if treshold exceeded and quantity is not a multiple of package size", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(11);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(
      "Quantity exceeds or is equal  the threshold and is not a multiple of package size"
    );
  });

  it("error if treshold equal to quantity and quantity is not a multiple of package size", () => {
    const validator = new QuantityValidator(10, 3);
    const result = validator.validate(10);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(
      "Quantity exceeds or is equal the threshold and is not a multiple of package size"
    );
  });

  it("valid if treshold exceeded and quantity is a multiple of package size", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(12);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("valid if quantity equals threshold and is a multiple of package size", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(10);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("error if treshold less than 0", () => {
    expect(() => new QuantityValidator(-1, 2)).toThrow(
      "Treshold cannot be negative"
    );
  });

  it("error if packageSize less than 0", () => {
    expect(() => new QuantityValidator(10, -2)).toThrow(
      "PackageSize should be greater than zero"
    );
  });

  it("error if packageSize is 0", () => {
    expect(() => new QuantityValidator(10, 0)).toThrow(
      "PackageSize should be greater than zero"
    );
  });

  it("error if quantity is equal to 0", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(0);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Quantity cannot be negative or zero");
  });

  it("error if quantity is negative", () => {
    const validator = new QuantityValidator(10, 2);
    const result = validator.validate(-4);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Quantity cannot be negative or zero");
  });
});
