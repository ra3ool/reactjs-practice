import { z } from 'zod';

export const loginSchema = z
  .object({
    identifier: z.string().min(1, 'Email or username is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain uppercase, lowercase, and number',
      ),
    remember: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { identifier } = data;
    if (identifier.includes('@')) {
      // Validate as email
      if (!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})$/i.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid email address',
          path: ['identifier'],
        });
      }
    } else {
      // Validate as username
      if (identifier.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 4,
          type: 'string',
          inclusive: true,
          message: 'Username must be at least 4 characters',
          path: ['identifier'],
        });
      }
    }
  });

export const responseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
  }),
});
