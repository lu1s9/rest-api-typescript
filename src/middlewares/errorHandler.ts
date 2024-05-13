import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    let errorMessage = 'An unknown error occurred';
    const errorStatus = res.statusCode || 500;
    if (err instanceof Error) errorMessage = err.message;
    return res.status(errorStatus).json([errorMessage]);
};

export default errorHandler;
