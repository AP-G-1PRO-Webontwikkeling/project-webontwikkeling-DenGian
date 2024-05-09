import { NextFunction, Request, Response } from 'express';

export function redirectIfLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        res.redirect('/languages');
    } else {
        next();
    }
}
