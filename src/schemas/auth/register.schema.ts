import z from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(4, 'Username must be at least 4 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain uppercase, lowercase, and number',
      ),
    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),
    terms: z
      .boolean({ required_error: 'You must accept the terms and conditions' })
      .refine((val) => val === true, {
        message: 'you must accept, there is no other choice',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
