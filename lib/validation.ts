import {z} from 'zod';
const RequiredString = z.string().trim().min(1, "Required")

export const SignUpSchema = z.object({
email:RequiredString.email("Invalid email"),
username:RequiredString.regex(/^[a-zA-Z0-9_-]/, "Invalid Username"),
password: RequiredString.min(8, "Must be atleat 8 charecters")
})
export const LoginSchema = z.object({
    username: RequiredString,
    password:RequiredString,
})
// export Type  SignUpValues = z.infer<typeof SignUpSchema>
// export Type  SignInValues = z.infer<typeof LoginSchema>
export const PostSchema = z.object({
    caption :RequiredString
})