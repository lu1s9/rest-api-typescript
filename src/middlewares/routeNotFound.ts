import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function routeNotFound(_req: Request, res: Response, _next: NextFunction) {
    const error = new Error('Not found');

    return res.status(404).json({
        error: {
            message: error.message
        }
    });
}
