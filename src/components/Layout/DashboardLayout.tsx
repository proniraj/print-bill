import {
  Box,
  Flex,
  Link,
  HStack,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Label Print", path: "/label-print" },
  { name: "Bill Print", path: "/bill-print" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex direction="column" h="100vh">
      {/* Top Navigation */}
      <Box
        as="nav"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        position="fixed"
        w="full"
        zIndex={10}
      >
        <Container maxW="container.xl" py={3}>
          <Flex justify="space-between" align="center">
            <Link
              as={NextLink}
              href="/"
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              Seetal Express
            </Link>

            <HStack spacing={4}>
              {menuItems.map((item) => (
                <Link
                  as={NextLink}
                  key={item.path}
                  href={item.path}
                  px={4}
                  py={2}
                  borderRadius="md"
                  bg={
                    router.pathname === item.path ? "blue.500" : "transparent"
                  }
                  color={router.pathname === item.path ? "white" : "inherit"}
                  _hover={{
                    bg: router.pathname === item.path ? "blue.600" : "gray.100",
                    textDecoration: "none",
                  }}
                >
                  <Text fontSize="sm">{item.name}</Text>
                </Link>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        pt="64px" // Height of the top nav + some padding
        w="full"
        h="full"
        overflowY="auto"
      >
        <Container maxW="container.xl" py={4}>
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
