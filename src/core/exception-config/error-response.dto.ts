export class ErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;

  constructor(statusCode: number, message: string, path: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }
}
