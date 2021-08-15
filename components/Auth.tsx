import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import useDraws from "../hooks/useDraws";

const Auth = () => {
  const { signInWithGitHub, isAuth, signOut } = useAuth();
  const { draws, loading } = useDraws();

  if (loading) return <Spinner />;

  const isEmpty = draws === undefined || draws.length === 0;

  if (isAuth) {
    return (
      <>
        {!isEmpty && <DrawList draws={draws} />}
        <Button position="absolute" right="0" top="0" m="2" onClick={signOut}>
          Sign out
        </Button>
      </>
    );
  }

  return <Button onClick={signInWithGitHub}>GitHub Sign in </Button>;
};

const DrawList = ({ draws }) => {
  return (
    <Box p="10">
      <Text mb="5" fontSize="lg" fontWeight="bold">
        Draws list
      </Text>
      <div>
        {draws.map((draw: any) => (
          <div>
            <Link href={`/draws/${draw.id}`}>{draw.title}</Link>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Auth;
