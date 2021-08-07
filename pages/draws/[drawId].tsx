import { FC, useEffect, useState } from "react";
import Error from "next/error";
import {
  Flex,
  Text,
  Spinner,
  List,
  ListItem,
  ListIcon,
  Box,
  Button,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { BiUserCircle } from "react-icons/bi";
import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const drawId = context.query.drawId;

  const props = { drawId };

  return { props };
};

const WINNERS = 3;

const getRandomIndex = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Participant = {
  fullName: string;
  email: string;
};

type Metadata = {
  participants: Participant[];
};

type Draw = {
  id: number;
  title: string;
  user_id: string;
  metadata: Metadata;
};

const DrawPage = ({ drawId }) => {
  const [draw, setDraw] = useState<Draw>();
  const [error, setError] = useState<PostgrestError>();
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("preview");
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("draws")
        .select("*")
        .eq("id", drawId);

      if (error) return setError(error);

      setDraw(data[0]);
      setLoading(false);
    }

    fetchData();
  }, []);

  const startDraw = async () => {
    // time trying to get the winners
    const winners = [];
    const participants = draw.metadata?.participants || [];
    const participantsCopy = participants.slice();

    setStatus("selecting");

    while (winners.length < WINNERS && participants.length >= WINNERS) {
      await delay(5000);

      const randomIndex = getRandomIndex(0, participantsCopy.length);
      const [winner] = participantsCopy.splice(randomIndex, 1);

      winners.push(winner);

      setWinners((winners) => {
        return winners.concat(winner);
      });
    }

    setStatus("finished");
  };

  const retryDraw = () => {
    setWinners([]);
    setStatus("preview");
  };

  if (loading) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  if (error) return <Error statusCode={500} />;

  const participants = draw.metadata?.participants || [];

  const isSelecting = status === "selecting";
  const isFinished = status === "finished";
  const isPreview = status === "preview";

  const showParticipants =
    participants.length > 0 &&
    winners.length === 0 &&
    (isPreview || isSelecting);

  const showWinners = winners.length > 0 && (isSelecting || isFinished);

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="2xl" mb="2">
        {draw.title}
      </Text>
      {showParticipants && (
        <>
          <ParticipantsList title="participants" participants={participants} />
          <Button
            isLoading={isSelecting}
            onClick={startDraw}
            m="2"
            bg="purple.500"
            color="white"
            width="250px"
            _hover={{
              bg: "purple.400",
              color: "white",
            }}
          >
            Start
          </Button>
        </>
      )}
      {showWinners && (
        <>
          <ParticipantsList title="winners" participants={winners} />
          <Button
            isLoading={isSelecting}
            onClick={retryDraw}
            m="2"
            bg="purple.500"
            color="white"
            width="250px"
            _hover={{
              bg: "purple.400",
              color: "white",
            }}
          >
            Retry
          </Button>
        </>
      )}
    </Flex>
  );
};

type ParticipantsListProps = {
  title: string;
  participants: Participant[];
};

const ParticipantsList: FC<ParticipantsListProps> = ({
  title,
  participants,
}) => {
  return (
    <Box
      borderStyle="solid"
      borderWidth="2px"
      borderColor="purple.500"
      minHeight="154px"
      w="250px"
    >
      <Text
        bg="purple.500"
        p="4"
        fontSize="xl"
        fontWeight="bold"
        textTransform="capitalize"
        color="white"
      >
        {title}
      </Text>
      <List p="2">
        {participants.map((participant, i) => (
          <ListItem key={Date.now() * i}>
            <ListIcon as={BiUserCircle} color="purple.500" />
            {participant.fullName}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawPage;
