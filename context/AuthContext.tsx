import { UserCredentials } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const appUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "local"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const SIGNED_IN = "SIGNED_IN";
const SIGNED_OUT = "SIGNED_OUT";

const AuthContext = createContext({
  isAuth: false,
  session: null,
  signOut: () => {},
  signInWithGitHub: () => {},
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(supabase.auth.session());

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGitHub = async () => {
    const credentials = { provider: "github" } as Partial<UserCredentials>;
    const options = { redirectTo: appUrl };

    await supabase.auth.signIn(credentials, options).catch(console.error);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === SIGNED_IN) return setSession(session);
      if (event === SIGNED_OUT) return setSession(null);
    });
  }, []);

  const isAuth = Boolean(session);

  const value = {
    isAuth,
    session,
    signOut,
    signInWithGitHub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export default AuthContext;
