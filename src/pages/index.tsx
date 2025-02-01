import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Stack,
  useColorModeValue,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaFileInvoice, FaTag } from "react-icons/fa";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

const NavigationCard = ({
  title,
  description,
  icon,
  path,
}: NavigationCardProps) => {
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Card
      bg={cardBg}
      cursor="pointer"
      onClick={() => router.push(path)}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
        bg: hoverBg,
      }}
      transition="all 0.2s"
    >
      <CardBody>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Box
              p={3}
              bg="blue.500"
              color="white"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={icon} boxSize={6} />
            </Box>
            <Heading size="md">{title}</Heading>
          </HStack>
          <Text color="gray.600" _dark={{ color: "gray.300" }}>
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default function Dashboard() {
  const navigationItems = [
    {
      title: "Label Print",
      description:
        "Print shipping labels for packages with customizable sizes and formats",
      icon: FaTag,
      path: "/label-print",
    },
    {
      title: "Bill Print",
      description:
        "Generate and print invoices and bills for orders and transactions",
      icon: FaFileInvoice,
      path: "/bill-print",
    },
  ];

  return (
    <Box>
      <Heading size="lg" mb={8}>
        Welcome to Seetal Express
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {navigationItems.map((item) => (
          <NavigationCard key={item.path} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
