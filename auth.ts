import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
}


function getExpiry(accessToken: string) {
    const decoded = jwtDecode<DecodedToken>(accessToken);
    return decoded.exp * 1000;
}


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

                

                const user = await response.json();
                
                
                if(user.success){
                    return user;
                }
                return null;
            },
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 365 * 24 * 60 * 60,
        updateAge: 5 * 60,
    },

    jwt: {
        maxAge: 365 * 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {

                if(!user?.access || !user?.refresh){
                    throw new Error("Missing tokens for login");
                }

                token.accessToken = user?.access;
                token.refreshToken = user?.refresh;
                token.id = user?.id;
                token.name = user?.name ?? undefined;
                token.expiresAt = getExpiry(user?.access);
                return token;
            }
            

            if(Date.now() < (token.expiresAt as number) - 60 * 1000){
                return token;
            }

            // Token refresh
            try{
                const res = await fetch(`${process.env.APIURL}/account/refresh/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refresh: token.refreshToken }),
                });

                if (!res.ok) throw new Error("Refresh failed");

                const refreshed = await res.json();

                token.accessToken = refreshed.access;
                token.expiresAt = getExpiry(refreshed.access);
                if(refreshed.refresh){
                    token.refreshToken = refreshed.refresh;
                }
                
                
                return token;
            } catch(e) {
                console.error("Token refresh failed:", e);
                return { ...token, error: "RefreshAccessTokenError", accessToken: null };
            }

        },
        async session({ session, token }) {
            const t = token as JWT;
            session.accessToken = t?.accessToken as string;
            session.refreshToken = t?.refreshToken as string;
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