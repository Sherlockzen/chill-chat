'use server'
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";

export const authLogin = async (provider: string) => {
  try {
    await signIn(provider);
    return {
      success: 'Login realizado com sucesso',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Email ou senha incorretos',
          }
        default:
          return { error: 'Ocorreu um erro ao realizar o login' };
      }
    }
    throw error;
  }
}