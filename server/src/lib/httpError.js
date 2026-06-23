export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }

  static notFound(message = "Resource not found") {
    return new HttpError(404, message);
  }

  static badRequest(message = "Bad request") {
    return new HttpError(400, message);
  }
}
