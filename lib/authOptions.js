import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // اعتبارسنجی با Mongoose
                await dbConnect();
                const user = await User.findOne({ email: credentials.email.toLowerCase() });
                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    return null;
                }

                // NextAuth expects an object. هرچیزی برگشتی در session.user قرار می‌گیرد
                return { id: user._id.toString(), name: user.name, email: user.email };
            }
        })
    ],
    session: {
        strategy: "jwt", // ساده و مناسب برای App Router
    },
    callbacks: {
        async jwt({ token, user }) {
            // وقتی user از authorize برگشت داده شود، آن را token اضافه کن
            if (user) {
                token.id = user.id || user._id;
            }
            return token;
        },
        async session({ session, token }) {
            // معلومات اضافی در session
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/(auth)/signin', // اگر صفحهٔ سفارشی خواستی
    }
};
