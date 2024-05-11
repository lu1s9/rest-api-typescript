import { NextFunction, RequestHandler, Response, Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncRequestHandler = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Catches errors and passes them to the next callback
 * @param handler Async express request handler/middleware potentially throwing errors
 * @returns Async express request handler with error handling
 */
export default (handler: AsyncRequestHandler): RequestHandler => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next);
    };
};
