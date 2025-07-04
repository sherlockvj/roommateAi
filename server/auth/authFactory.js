import { ApiError } from "../errors/ApiError.js";
import EmailAuthStrategy from "./strategies/email.strategy.js";

export const AuthFactory = (type) => {
  switch (type) {
    case "email":
      return new EmailAuthStrategy();
    default:
      throw new ApiError("Unsupported auth strategy", 401);
  }
};