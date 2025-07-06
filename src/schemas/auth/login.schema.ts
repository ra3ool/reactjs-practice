import { z } from 'zod';

// Define schema for request payload
const requestSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 6 characters'),
});

// Define schema for API response
const responseSchema = z.object({
    id: z.string().optional(), //TODO removce optional after server changes
    accessToken: z.string(),
    user: z.object({
        name: z.string(),
        email: z.string().email(),
    }).optional(),
});

export default { requestSchema, responseSchema }