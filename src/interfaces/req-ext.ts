import { Request } from 'express';

export interface RequestExt extends Request {
    user?: string | undefined;
}

export interface IGetUserAuthInfoRequest extends Request {
    user: string | null;
}
