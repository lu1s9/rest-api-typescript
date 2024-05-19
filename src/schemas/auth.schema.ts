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
        password: z.string().min(6, 'Password too short'),
        name: z.string().min(1, 'Name is required')
    })
});

export type UserInputType = z.infer<typeof loginSchema>['body'];
export type UserSignupType = z.infer<typeof signupSchema>['body'];
