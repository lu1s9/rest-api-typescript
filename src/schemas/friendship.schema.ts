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

export const createFriendshipSchema = z.object({
    ...payload
});

export type CreateFriendshipType = z.infer<typeof createFriendshipSchema>['body'];
