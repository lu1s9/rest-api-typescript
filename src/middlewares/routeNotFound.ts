import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function routeNotFound(_req: Request, res: Response, next: NextFunction) {
    res.status(404);
    next(Error('Endpoint not found'));
}
