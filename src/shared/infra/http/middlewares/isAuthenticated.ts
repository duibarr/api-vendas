import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { MIDDLEWARES } = ERROR_MESSAGES;
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError(MIDDLEWARES.JWT_MISSING);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret as Secret);

        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError(MIDDLEWARES.JWT_INVALID);
    }
}
