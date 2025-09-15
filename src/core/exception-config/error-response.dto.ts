// error-response.dto.ts
export class ErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}
