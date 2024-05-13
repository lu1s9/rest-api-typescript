import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email(),
        password: z.string().min(6, 'Password too short')
    })
});

export const signupSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email(),
        password: z.string().min(6, 'Password too short')
    })
});

export type UserInputType = z.infer<typeof signupSchema>['body'];
