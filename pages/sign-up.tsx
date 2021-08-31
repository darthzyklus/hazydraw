import { useEffect, useState } from "react";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import {
  Center,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "@fontsource/montserrat/400.css";

const signupSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please, enter a valid email." }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Minimum length should be 8." }),
});

type Schema = z.infer<typeof signupSchema>;
type IFormValues = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Schema>({ resolver: zodResolver(signupSchema) });

  const toast = useToast();

  const createUser = async (values: IFormValues) => {
    const { email, password } = values;
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { user, session, error };
  };

  const onSubmit = (values: IFormValues) => {
    // const { email, password } = values;
    // console.log(typeof email, typeof password);
    setLoading(true);
    createUser(values).then((res) => {
      console.log(res.user.id);
      setLoading(false);
      toast({
        position: "bottom",
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Head>
        <title>HAZY DRAW - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center w="100%" h="100vh">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          maxWidth="400px"
          textAlign="center"
          m={3}
        >
          <Heading as="h1" fontSize={["4xl", "3xl"]} color="gray.100" mb="5">
            Sign Up
          </Heading>
          <Box borderColor="gray.700" borderWidth="1px" p="5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={Boolean(errors.email)} mb="4">
                <FormLabel htmlFor="email" textStyle="p">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  focusBorderColor="purple.500"
                  autoComplete="off"
                  borderRadius="none"
                  borderColor="gray.700"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please, enter a valid email",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.password)} mb="4">
                <FormLabel htmlFor="password" textStyle="p">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  focusBorderColor="purple.500"
                  autoComplete="off"
                  borderRadius="none"
                  borderColor="gray.700"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                bgColor="purple.500"
                textAlign="center"
                fontSize={["1.3rem", "1.2rem"]}
                fontWeight="bold"
                px={[5, 100]}
                py={[5, 2]}
                my="4"
                w="100%"
                _hover={{
                  bgColor: "purple.400",
                  boxShadow: "0px 3px 10px 5px #44337A",
                }}
                isLoading={loading}
                loadingText="Submitting"
                type="submit"
              >
                Register
              </Button>
            </form>
            <Text textAlign="left" fontSize="xs" mt="2" textStyle="p">
              Already have an account?
              <Link pl="1" href="/sign-in" color="purple.400">
                Sign in
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default SignUpPage;
