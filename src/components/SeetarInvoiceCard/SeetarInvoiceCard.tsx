import { FC } from "react";
import {
  Box,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  Text,
  Heading,
  VStack,
  Divider,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
import { numberToWords } from "amount-to-words";

interface SeetarInvoiceCardProps extends Record<string, string | number> {}

interface ParsedItem {
  sno: number;
  particulars: string;
  qty: number;
  rate: number;
  amount: number;
}

const itemPricesByCode = {
  SB101: 2000,
  SB102: 2000,
  SB103: 2000,
  SB104: 2000,
  SB105: 2000,
  SB106: 2000,
  SB107: 2000,
  SB108: 2000,
  SB109: 2000,
  SB110: 2000,
  SB201: 2000,
  SB202: 2000,
  SB203: 2000,
  SB205: 2000,
};

const formatCurrency = (amount: number) => {
  return `NPR.${amount.toFixed(2)}`;
};

const parseProducts = (productString: string = ""): ParsedItem[] => {
  try {
    return productString.split(",").map((item, index) => {
      const trimmedItem = item.trim();
      const [codeSection, colorSection = ""] = trimmedItem
        .split("|")
        .map((s) => s.trim());

      const quantityMatch = colorSection.match(/\*(\d+)$/);
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
      const rate =
        itemPricesByCode[codeSection as keyof typeof itemPricesByCode] || 2000;

      return {
        sno: index + 1,
        particulars: `${codeSection} ${colorSection
          .replace(/\*\d+$/, "")
          .trim()}`,
        qty: quantity,
        rate: rate,
        amount: rate * quantity,
      };
    });
  } catch (error) {
    console.error("Error parsing products:", error);
    return [];
  }
};

export const SeetarInvoiceCard: FC<SeetarInvoiceCardProps> = (data) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);

  const items = parseProducts(data["PRODUCT"] as string);
  const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
  const shippingCost = 0;
  const cod = Number(data["COD"]) || 0;
  const prepaid = Number(data["PP"]) || 0;
  const discount = Math.max(0, subTotal - (cod + prepaid - shippingCost));
  const totalDue = cod;
  const grandTotal = subTotal - discount;

  const summary = [
    ["Subtotal", formatCurrency(subTotal)],
    ["Discount", formatCurrency(discount)],
    ["Grand Total", formatCurrency(grandTotal)],
  ];

  return (
    <Box
      sx={{
        width: "148mm",
        fontSize: "10pt",
        minHeight: "189mm",
        padding: "5mm",
        display: "flex",
        flexDirection: "column",
        gap: "2mm",
        "@media print": {
          border: "none",
        },
      }}
    >
      {/* Header */}
      <Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap={4}
          alignItems="end"
        >
          <VStack align="flex-start" spacing={0}>
            <Heading size="lg" fontSize="24pt" fontWeight="bold" mb={2}>
              Seetar Global
            </Heading>
            <Stack direction="row" spacing={2} alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <Text>www.myseetara.com</Text>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <Text>facebook.com/myseetara</Text>
            </Stack>
          </VStack>
          <Box border="1px solid" borderColor="#000" p={2} borderRadius="md">
            <Text>Ranibari 26, Kathmandu Nepal</Text>
            <Text>Mobile: +977 9802359033</Text>
            <Text>Email: info@myseetara.com</Text>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Invoice Title */}
      <Heading size="lg" textAlign="center" mb={2}>
        Sales Invoice
      </Heading>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
        <VStack spacing={2} align="flex-start">
          <Text fontWeight="bold">PAN: 123106890</Text>
          <Box textTransform="capitalize">
            <Text>Name: {data["CUSTOMER NAME"]}</Text>
            <Text>Number: {data["CELL NUMBER"]}</Text>
            <Text>Address: {data["FULL ADDRESS"]}</Text>
          </Box>
        </VStack>

        <Text textAlign="right">
          Date: {data["INVOICE DATE"] || new Date().toLocaleDateString()}
        </Text>
      </Box>

      {/* Items Table */}
      <TableContainer>
        <Table
          variant="simple"
          border="1px"
          borderColor="gray.300"
          mb={4}
          borderStyle="solid"
        >
          <Thead>
            <Tr bg="gray.50">
              <Th border="1px" borderColor="gray.300">
                S.No.
              </Th>
              <Th border="1px" borderColor="gray.300">
                Particulars
              </Th>
              <Th border="1px" borderColor="gray.300" isNumeric>
                Qty
              </Th>
              <Th border="1px" borderColor="gray.300" isNumeric>
                Rate
              </Th>
              <Th border="1px" borderColor="gray.300" isNumeric>
                Amount
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.sno}
                sx={{
                  td: {
                    paddingY: "1mm",
                  },
                }}
              >
                <Td border="1px" borderColor="gray.300">
                  {item.sno}
                </Td>
                <Td border="1px" borderColor="gray.300">
                  {item.particulars}
                </Td>
                <Td border="1px" borderColor="gray.300" isNumeric>
                  {item.qty}
                </Td>
                <Td border="1px" borderColor="gray.300" isNumeric>
                  {item.rate}
                </Td>
                <Td border="1px" borderColor="gray.300" isNumeric>
                  {item.amount}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <Box display="flex" justifyContent="space-between">
        <Text>
          <strong>In Words:</strong> {numberToWords(totalDue)} only
        </Text>
        <VStack align="flex-end" spacing={1}>
          <Table variant="simple">
            <Tbody
              sx={{
                td: { paddingY: "1mm" },
                th: { paddingY: "1mm" },
              }}
            >
              {summary?.map(([label, value]) => (
                <Tr key={label}>
                  <Td>{label}</Td>
                  <Td textAlign="right">{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Box>

      <Box></Box>

      {/* <Box w="full">
        <Text
          textAlign="right"
          width="5rem"
          borderTop="1px dashed"
          ml="auto"
          mt={10}
        >
          Signature
        </Text>
      </Box> */}
    </Box>
  );
};

export default SeetarInvoiceCard;
