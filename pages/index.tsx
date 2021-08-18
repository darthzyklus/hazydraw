import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Center, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import "@fontsource/montserrat/400.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HAZY DRAW</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center w="100%" h="100vh">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          maxWidth="800px"
          textAlign="center"
          m={3}
        >
          <Heading
            as="h1"
            fontSize={["5xl", "7xl"]}
            textTransform="uppercase"
            color="gray.100"
          >
            Hazy Draw
          </Heading>
          <Text
            mt={["1", "8"]}
            mb={["1", null]}
            fontSize={["1.3rem", "2rem"]}
            color="purple.300"
            textStyle="p"
          >
            make draws easy to do and share
          </Text>
          <Stack
            direction="column"
            w={["90%", null]}
            spacing="6"
            mt={["8", null]}
          >
            <Link
              href="sign-up"
              bgColor="purple.500"
              textAlign="center"
              textTransform="uppercase"
              fontSize={["1.3rem", "1.5rem"]}
              fontWeight="bold"
              px={[5, 100]}
              py={[5, 2]}
              _hover={{
                bgColor: "purple.400",
                boxShadow: "0px 5px 10px 5px #44337A",
              }}
            >
              Sign up now
            </Link>
            <Link
              href="sign-in"
              bgColor="gray.700"
              textAlign="center"
              textTransform="uppercase"
              fontSize={["1.3rem", "1.5rem"]}
              fontWeight="bold"
              px={[5, 100]}
              py={[5, 2]}
              _hover={{
                bgColor: "gray.600",
                boxShadow: "0px 5px 10px 5px #2D3748",
              }}
            >
              Sign in
            </Link>
          </Stack>
        </Flex>
      </Center>
    </div>
  );
}
