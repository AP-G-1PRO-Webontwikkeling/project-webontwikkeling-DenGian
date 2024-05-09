import { NextFunction, Request, Response } from 'express';

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const userRole = req.session.user ? req.session.user.role : null;
    if (userRole === 'ADMIN') {
        next();
    } else {
        res.status(403).render("403");
    }
}
