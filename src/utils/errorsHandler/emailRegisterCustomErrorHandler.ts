import { HttpStatus } from '@nestjs/common';

export class EmailRegisterCustomErrorHandler {
  static handle(error: Error): { status: number; message: string } {
    if (error.message === 'Failed to send the confirmation email.') {
      return {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Failed to send the confirmation email. Please try again later.',
      };
    } else if (
      error.message === 'Email service credentials are not properly configured.'
    ) {
      return {
        status: HttpStatus.CONFLICT,
        message:
          'The email service is not properly configured. Please contact the administrator.',
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'An error occurred while processing your request. Please try again later.',
      };
    }
  }
}
