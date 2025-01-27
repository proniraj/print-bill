import { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <Flex direction="column" align="center" justify="center" h="100%" gap={4}>
      <Text fontSize="xl">Page Not Found</Text>
      <Text>Redirecting to Dashboard...</Text>
      <Spinner size="lg" color="blue.500" />
    </Flex>
  );
}
