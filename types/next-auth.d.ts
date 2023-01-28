// import { User } from "next-auth";
// import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
    interface JWT {
        firstName: string;
        lastName: string;
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the
     * `SessionProvider` React Context and trpc context
     */
    interface Session {
        user?: {
            firstName: string;
            lastName: string;
            email: string;
        }
    }

    /** Passed as a parameter to the `jwt` callback */
    interface User {
        firstName: string;
        lastName: string;
        createdAt: string;
    }
}

// declare module "next-auth/jwt"