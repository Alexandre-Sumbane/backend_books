import { BusinessException } from "../src/Exceptions/BusinessExceptions";

export class HttpExceptionFactory {

  static badRequest(message: string) {
    return new BusinessException(message, 400);
  }

  static conflict(message: string) {
    return new BusinessException(message, 409);
  }

  static notFound(message: string) {
    return new BusinessException(message, 404);
  }

  static internal(message: string = "Internal Server Error") {
    return new BusinessException(message, 500);
  }
}