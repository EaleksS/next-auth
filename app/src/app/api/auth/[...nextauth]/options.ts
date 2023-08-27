import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "your-cool-email",
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "password",
				},
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await db.user.findUnique({
					where: { email: credentials.email },
				});

				if (!existingUser) {
					return null;
				}

				if (credentials.password !== existingUser.password) {
					return null;
				}

				return {
					id: `${existingUser.id}`,
					username: existingUser.username,
					email: existingUser.email,
				};
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		newUser: "/auth/signup",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					username: user.username,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
				},
			};
		},
	},
};
