//------------------------CHAKRA UI------------------------------------
//Comentários gerais sobre o funcionamento da biblioteca de componentes
//Chakra UI se encontram no arquivo "src/comentariosChakraUI.txt"------

//Importa os componentes do Chakra UI
import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
} from "@chakra-ui/react";
//Importa ícones do react-icons .
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
//Importa as informações do usuário
import ProfileArray from "./ProfileArray";

//recebe o parâmetro de cor e exporta a função
export default function Contact({ color }) {
  //atribui as informações do usuário à variável profile
  const profile = ProfileArray();
  //atribui a função que abre uma nova janela passando o link do linkedIn do usuário
  const linkedin = () => {
    window.open(`${profile.linkedin}`, "_blank", "noreferrer,noopener");
  };
  //atribui a função que abre uma nova janela passando o link do github do usuário
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noreferrer,noopener");
  };
  //atribui a função que abre uma nova janela passando o link do email do usuário
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noreferrer,noopener");
  };

  //JSX
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {profile.contact}
            </Text>
            <Text
              color={`${color}.500`}
              fontWeight={600}
              fontSize={"lg"}
              px={4}
            >
              {profile.email}
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <FaLinkedin onClick={linkedin} size={28} />
                <FaGithub onClick={github} size={28} />
                <FaEnvelope onClick={email} size={28} />
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
