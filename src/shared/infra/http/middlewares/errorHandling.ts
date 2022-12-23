import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

export function errorHandling(
    error: Error,
    request: Request,
    response: Response,
): Response {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    // eslint-disable-next-line no-console
    console.log(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}
