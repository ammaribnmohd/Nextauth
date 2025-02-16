"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
//import { generateVerificationToken } from "@/lib/tokens";
import { signIn } from "@/auth";
import { getUserbyEmail } from "@/data/user";
//import { sendVerificationEmail } from "@/lib/mail"; // Import the function to send verification email

export const login = async (values: z.infer<typeof LoginSchema>) =>  {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid Fields!"};
    }
    const {email,password} = validatedFields.data;
    const existingUser= await getUserbyEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist!"}
    }
    /*if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(existingUser.email, verificationToken.token); // Resend verification email
        return { success: "Login Successful!" };
    }*/

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch(error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        throw error;
    }
};
