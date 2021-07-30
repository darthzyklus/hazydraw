import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { signInWithGitHub, isAuth, signOut } = useAuth();

  if (isAuth) {
    return <button onClick={signOut}>Sign out</button>;
  }

  return <button onClick={signInWithGitHub}>GitHub Sign in </button>;
};

export default Auth;
