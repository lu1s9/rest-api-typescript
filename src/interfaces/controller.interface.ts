import { Request } from 'express';

export default interface Controller {
    req: Request;
    res: Response;
}
