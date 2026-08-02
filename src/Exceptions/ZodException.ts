import { ZodError, ZodIssue } from "zod";

export class ZodException extends ZodError {
  public statusCode: number;

  constructor(issues: ZodIssue[], statusCode: number = 400) {
    super(issues);
    this.statusCode = statusCode;
  }
}