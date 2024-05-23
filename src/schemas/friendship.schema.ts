import { z } from 'zod';

const payload = {
    body: z.object({
        user1_ID: z
            .string({
                required_error: 'user1_ID is required',
                invalid_type_error: 'user1_ID must be a string'
            })
            .regex(/^[0-9a-fA-F]{24}$/, 'invalid user1_ID'),
        user2_ID: z
            .string({
                required_error: 'user2_ID is required',
                invalid_type_error: 'user2_ID must be a string'
            })
            .regex(/^[0-9a-fA-F]{24}$/, 'invalid user2_ID')
    })
};

const params = {
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid friendship ID')
    })
};

export const createFriendshipSchema = z.object({
    ...payload
});

export const getFriendshipSchema = z.object({
    ...params
});

export const updateFriendshipSchema = z.object({
    ...params,
    body: z.object({
        // status: z.string({ required_error: 'status is required' }).min(1, 'Status must be 1 length character')
        status: z.enum(['Accepted', 'Pending'])
    })
});

export type CreateFriendshipType = z.infer<typeof createFriendshipSchema>['body'];
export type UpdateFriendshipType = z.infer<typeof updateFriendshipSchema>['body'];
export type GetFriendshipParamsType = z.infer<typeof getFriendshipSchema>['params'];
