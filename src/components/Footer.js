//------------------------CHAKRA UI------------------------------------
//Comentários gerais sobre o funcionamento da biblioteca de componentes
//Chakra UI se encontram no arquivo "src/comentariosChakraUI.txt"------

//Importa os componentes do Chakra UI
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

//Exporta componente de footer
export default function Footer() {
  //Retorna o JSX
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} align="center">
        <Text>© 2023 Eldora Boo. All rights reserved</Text>
      </Container>
    </Box>
  );
}
