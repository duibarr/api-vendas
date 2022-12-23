import { NextFunction, Request, Response } from 'express';

export function logRoutes(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { method, url, ip } = request;
    const currentDate = new Date();
    const dateFormatted = currentDate.toLocaleString('pt-BR');

    const route = `[${method.toUpperCase()}] to ${url} from IP ${ip} at ${dateFormatted} (UTC -3)`;

    console.log(route);

    return next();
}
