import { randomUUID } from "crypto";
import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSchema } from "../../../types/user.schema";
import { fritzBoxSessions } from "../../../server/api/services/fritzbox.sessions";
import { createFritzBoxClient } from "../../../server/api/services/fritzbox.service";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session: nextAuthSession, token }) => {
      const userToken = userSchema.safeParse(token);
      const session = nextAuthSession;
      if (session?.user && userToken.success) {
        session.user.id = userToken.data.id;
        session.user.fritzbox = {
          username: userToken.data.fritzbox.username,
        };
      }
      if (session.user) {
        const creds = await fritzBoxSessions.get(session.user.id);
        if (!creds) {
          throw new Error("credentials not synced for user");
        }
      }
      return session;
    },
    jwt: ({ user: userTmp, token }) => {
      const user = userTmp as Session["user"];
      if (user) {
        token.id = user.id;
        token.fritzbox = {
          username: user.fritzbox.username,
        };
      }
      return token;
    },
  },
  events: {
    signOut: async ({ token }) => {
      await fritzBoxSessions.remove(token.id as string);
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const fritzBox = createFritzBoxClient({
              username: credentials.username,
              password: credentials.password,
            });
            await fritzBox.deviceInfo.getInfo();
            const sessionId = randomUUID();
            await fritzBoxSessions.store(sessionId, {
              username: credentials.username,
              password: credentials.password,
            });

            return {
              id: sessionId,
              fritzbox: {
                username: credentials.username,
              },
            } satisfies Session["user"];
          } catch (error) {
            console.log(error);
          }
        }
        return null;
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
