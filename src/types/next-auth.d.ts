import "next-auth";
import "@total-typescript/ts-reset";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      fritzbox: {
        username: string;
      };
    };
  }
}
