import {
  Flex,
  Text,
  Show,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { UserConsumer } from "../Contexts/userContext";
import React from "react";
import SihLogo from "./SihLogo";
import WebCrawler from "./WebCrawler";
import Login from "../Home/Login";
import Register from "../Home/Register";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect,useState } from "react";

function Intro() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);
  return (
    <UserConsumer>
      {(props) => {
        return (
          <Flex
            mt={4}
            p={4}
            gap="2rem"
            w="100%"
            h="80vh"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <SihLogo />
            <Text
              textAlign="center"
              fontFamily="Roboto"
              fontWeight="900"
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              for SIH 2022
            </Text>
            <Text
              textAlign="center"
              fontFamily="Rubik"
              fontWeight="800"
              fontSize={{ base: "4xl", lg: "6xl" }}
            >
              PLAGIARISM CHECKER
            </Text>
            <WebCrawler />
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight="500"
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              a{" "}
              <u>
                <span style={{ letterSpacing: "0.3rem" }}>webCrawling</span>
              </u>{" "}
              project
            </Text>

            {/* to show forms */}
            <Show below="md">
              {<HStack>
                {/* login */}
                <Button
                  size="lg"
                  fontSize="1.5rem"
                  onClick={onLoginOpen}
                  colorScheme="red"
                >
                  Login
                </Button>
                <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
                  <ModalOverlay />
                  <ModalContent bg="#171717">
                    <ModalCloseButton />
                    <ModalBody>
                      <Login show="" width="100%" />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onLoginClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {/* register */}
                <Button
                  size="lg"
                  fontSize="1.5rem"
                  onClick={onRegisterOpen}
                  colorScheme="messenger"
                >
                  Register
                </Button>
                <Modal
                  bg="#000"
                  w="100%"
                  isOpen={isRegisterOpen}
                  onClose={onRegisterClose}
                >
                  <ModalOverlay />
                  <ModalContent bg="#171717">
                    <ModalCloseButton />
                    <ModalBody>
                      <Register show="" width="100%" />
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={onRegisterClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>}
            </Show>
          </Flex>
        );
      }}
    </UserConsumer>
  );
}

export default Intro;
