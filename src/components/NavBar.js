import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  HStack,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProfileArray from "./ProfileArray";
const TbIcons = require("react-icons/tb");

//Navbar recebendo parâmetro de cor e sendo exportado
export default function Nav({ color }) {
  //Importando informações do usuário do currículo portátil
  const profile = ProfileArray();

  //Cores disponíveis para alterar o currículo
  const colors = {
    blue: "#3182CE",
    cyan: "#00B5D8",
    gray: "#718096",
    green: "#38A169",
    orange: "#DD6B20",
    pink: "#D53F8C",
    purple: "#805AD5",
    red: "#E53E3E",
    teal: "#319795",
    yellow: "#D69E2E",
  };

  //Declarando estado que será armazenada a informação de scroll ou não
  const [scroll, setScroll] = useState(false);

  //Estado sintético do Chakra UI que alterna entre dark/day mode
  const { colorMode, toggleColorMode } = useColorMode();

  //Estado sintético do Chakra UI que define o comportamento dos
  //menus em desktop e em mobile
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Define a exibição entre desktop e mobile
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  //As funções que direcionam o usuário para cada seção do site
  //utilizam o mesmo mecanismo: atribuem a seção com a respectiva ID no DOM
  //e nela chamam o método scrollIntoView, com o comportamento smooth
  const scrollToHero = () => {
    const heroSection = document.querySelector("#hero");
    heroSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToExperience = () => {
    const experienceSection = document.querySelector("#experience");
    experienceSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };

  //Função que checa se algum scroll aconteceu, partindo do topo do site
  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  //EventListener que é o gatilho do scroll
  window.addEventListener("scroll", changeScroll);

  //Array em que serão armazenadas as letras indicadas pelo usuário para o nav
  const TbLetterComponents = [];

  //For loop que busca em profile e popula o array com
  //as letras que formarão o "logo"
  for (let i = 0; i < profile.logo.length; i++) {
    const letter = profile.logo[i];
    const component = TbIcons[`TbLetter${letter}`];
    TbLetterComponents.push(component);
  }

  //JSX
  return (
    <>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h={16}
        boxShadow={scroll ? "base" : "none"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Link onClick={scrollToHero}>
          <HStack>
            {TbLetterComponents.map((Component, index) => (
              <Component key={index} color={colors[color]} />
            ))}
          </HStack>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {isLargerThanMD ? (
              <>
                <Button variant="ghost" onClick={scrollToAbout}>
                  About
                </Button>
                <Button variant="ghost" onClick={scrollToExperience}>
                  Experience
                </Button>
                <Button variant="ghost" onClick={scrollToProjects}>
                  Projects
                </Button>
                <Button variant="ghost" onClick={scrollToContact}>
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button variant="ghost" onClick={scrollToAbout}>
                        About
                      </Button>
                      <Button variant="ghost" onClick={scrollToExperience}>
                        Experience
                      </Button>
                      <Button variant="ghost" onClick={scrollToProjects}>
                        Projects
                      </Button>
                      <Button variant="ghost" onClick={scrollToContact}>
                        Contact
                      </Button>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
