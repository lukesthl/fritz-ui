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
        password: string;
      };
    };
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      FRITZBOX_HOST?: string;
      FRITZBOX_PORT?: string;
      FRITZBOX_SSL?: string;
    }
  }
}
