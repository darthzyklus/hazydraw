import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

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
    await supabase.auth
      .signIn({
        provider: "github",
      })
      .catch(console.error);
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
