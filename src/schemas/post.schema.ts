import { z } from 'zod';

const payload = {
    body: z.object({
        content: z
            .string({
                required_error: 'Content is required'
            })
            .min(1, 'Post content must be at least 1 character')
    })
};

const params = {
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid post ID')
    })
};

export const createPostSchema = z.object({
    ...payload
});

export const getPostSchema = z.object({
    ...params
});

export const deletePostSchema = z.object({
    ...params
});

export const updatePostSchema = z.object({
    ...payload,
    ...params
});

export type CreatePostType = z.infer<typeof createPostSchema>['body'];
export type UpdatePostBodyType = z.infer<typeof updatePostSchema>['body'];
export type UpdatePostParamsType = z.infer<typeof updatePostSchema>['params'];
export type DeletePostParamsType = z.infer<typeof deletePostSchema>['params'];
