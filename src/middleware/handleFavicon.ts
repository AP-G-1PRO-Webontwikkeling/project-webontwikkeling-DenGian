import { Request, Response, NextFunction } from 'express';

export const faviconMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).end();
    } else {
        next();
    }
};
