import {
  Box,
  Flex,
  Link,
  VStack,
  Text,
  useColorModeValue,
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
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar */}
      <Box
        w={{ base: "70px", md: "240px" }}
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        py={4}
        position="fixed"
        h="full"
      >
        <VStack spacing={2} align="stretch">
          {menuItems.map((item) => (
            <Link
              as={NextLink}
              key={item.path}
              href={item.path}
              px={4}
              py={3}
              borderRadius="md"
              display="flex"
              alignItems="center"
              bg={router.pathname === item.path ? "blue.500" : "transparent"}
              color={router.pathname === item.path ? "white" : "inherit"}
              _hover={{
                bg: router.pathname === item.path ? "blue.600" : "gray.100",
                textDecoration: "none",
              }}
            >
              <Text fontSize="sm" display={{ base: "none", md: "block" }}>
                {item.name}
              </Text>
              {/* Show only first letter on mobile */}
              <Text fontSize="sm" display={{ base: "block", md: "none" }}>
                {item.name[0]}
              </Text>
            </Link>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box
        ml={{ base: "70px", md: "240px" }}
        w="full"
        h="full"
        overflowY="auto"
        p={4}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
