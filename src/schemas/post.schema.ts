import { z } from 'zod';

export const createPostSchema = z.object({
    body: z.object({
        content: z
            .string({
                required_error: 'Content is required'
            })
            .min(1, 'Post content must be at least 1 character')
    })
});

export const getPostSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid ID')
    })
});

export const deletePostSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid ID')
    })
});

export const updatePostSchema = z.object({
    body: z.object({
        content: z
            .string({
                required_error: 'Content is required'
            })
            .min(1, 'Post content must be at least 1 character')
    }),
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid ID')
    })
});

export type CreatePostType = z.infer<typeof createPostSchema>['body'];
export type UpdatePostBodyType = z.infer<typeof updatePostSchema>['body'];
export type UpdatePostParamsType = z.infer<typeof updatePostSchema>['params'];
export type DeletePostParamsType = z.infer<typeof deletePostSchema>['params'];
