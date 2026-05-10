import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    twoFactorClient(),
    magicLinkClient(),
  ],
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  magicLink,
  twoFactor,
} = authClient;
