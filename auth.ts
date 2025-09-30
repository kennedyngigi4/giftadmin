import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                passord: {}
            },

            async authorize(credentials, request) {
                const response = await fetch(`${process.env.APIURL}/account/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials)
                });

                console.log(response)

                const user = await response.json();
                console.log(user)
                
                if(user.success){
                    return user;
                }
                return null;
            },
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.accessToken = user?.access;
                token.id = user?.id;
                token.name = user?.name ?? undefined;
            }
            return token;
        },
        async session({ session, token }) {
            const t = token as JWT;
            session.accessToken = t?.accessToken as string;
            session.user.id = t?.id as string;
            session.user.name = token?.name ?? undefined;
            return session;
        },
    },

    pages: {
        signIn: "/auth/login"
    },

    trustHost: true,
})