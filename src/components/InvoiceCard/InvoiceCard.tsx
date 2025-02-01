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
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { MdCircle } from "react-icons/md";

interface InvoiceCardProps extends Record<string, string | number> {}

interface ParsedItem {
  itemCode: string;
  color: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const itemPricesByCode = {
  SB101: 3000,
  SB102: 3000,
  SB103: 3000,
  SB104: 3000,
  SB105: 3000,
  SB106: 3000,
  SB107: 3000,
  SB108: 3000,
  SB109: 3000,
  SB110: 3000,
  SB201: 3000,
  SB202: 3000,
  SB203: 3000,
  SB205: 3000,
};

const parseProducts = (productString: string = ""): ParsedItem[] => {
  try {
    // Split products by comma
    return productString.split(",").map((item) => {
      const trimmedItem = item.trim();
      // Split by | to separate code and color
      const [codeSection, colorSection = ""] = trimmedItem
        .split("|")
        .map((s) => s.trim());

      // Extract quantity from color section if exists
      const quantityMatch = colorSection.match(/\*(\d+)$/);
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

      // Clean color name by removing quantity
      const color = colorSection.replace(/\*\d+$/, "").trim();

      const unitPrice =
        itemPricesByCode[codeSection as keyof typeof itemPricesByCode] || 2000;

      return {
        itemCode: codeSection,
        color,
        quantity,
        unitPrice,
        total: unitPrice * quantity,
      };
    });
  } catch (error) {
    console.error("Error parsing products:", error);
    return [];
  }
};

const formatCurrency = (amount: number) => {
  return `NPR.${amount.toFixed(2)}`;
};

export const InvoiceCard: FC<InvoiceCardProps> = (data) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);

  const items = parseProducts(data["PRODUCT"] as string);
  const subTotal = items.reduce((sum, item) => sum + item.total, 0);
  const shippingCost = 100;
  const cod = Number(data["COD"]) || 0;
  const prepaid = Number(data["PP"]) || 0;
  const discount = Math.max(0, subTotal - (cod + prepaid - shippingCost));
  const totalDue = cod;

  return (
    <Box
      sx={{
        width: "128mm",
        minHeight: "189mm",
        padding: "5mm",
        border: "1px solid",
        borderColor: "gray.300",
        fontSize: "7pt",
        display: "flex",
        flexDirection: "column",
        gap: "2mm",
        "@media print": {
          border: "none",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <VStack align="flex-start" spacing={0}>
          <Heading size="md" fontSize="9pt" fontWeight="bold" mb={0.5}>
            Today Trend Online Shopping
          </Heading>
          <Text fontSize="6pt" lineHeight="1.2">
            Ranibari Chowk, Kathmandu 44611
          </Text>
          <Text fontSize="6pt" lineHeight="1.2">
            +977-9802359033
          </Text>
        </VStack>
        <Heading size="lg" fontSize="12pt">
          INVOICE
        </Heading>
      </Box>

      {/* Bill Info */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Text fontWeight="bold" fontSize="7pt" mb={0.5}>
            Bill To
          </Text>
          <Text fontSize="7pt" lineHeight="1.3" textTransform="capitalize">
            {data["CUSTOMER NAME"] || ""}
          </Text>
          <Text fontSize="7pt" lineHeight="1.3" textTransform="capitalize">
            {data["FULL ADDRESS"] || "Kathmandu, Nepal"}
          </Text>
          <Text fontSize="7pt" lineHeight="1.3">
            {data["CELL NUMBER"]}{" "}
            {data?.["ALT.NUM."] ? `, ${data["ALT.NUM."]}` : ""}
          </Text>
        </Box>
        <Table size="sm" variant="unstyled" maxW="40%">
          <Tbody>
            <Tr>
              <Td px={1} py={0} fontSize="7pt">
                Invoice #
              </Td>
              <Td px={1} py={0} fontSize="7pt">
                {data["INVOICE #"] ||
                  // generate random invoice number it should be 6 digits and no alphabets prefix with INV-
                  `INV-${Math.floor(
                    100000 + Math.random() * 900000
                  ).toString()}`}
              </Td>
            </Tr>
            <Tr>
              <Td px={1} py={0} fontSize="7pt">
                Invoice Date
              </Td>
              <Td px={1} py={0} fontSize="7pt">
                {data["INVOICE DATE"] || new Date().toLocaleDateString()}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Items Table */}
      <Box mb={2}>
        <Table variant="simple" size="sm" fontSize="8px">
          <Thead>
            <Tr bg="gray.50">
              <Th fontSize="8px" py={0.5} px={1}>
                CODE
              </Th>
              <Th fontSize="8px" py={0.5} px={1}>
                DESCRIPTION
              </Th>
              <Th fontSize="8px" py={0.5} px={1} isNumeric>
                QTY
              </Th>
              <Th fontSize="8px" py={0.5} px={1} isNumeric>
                PRICE
              </Th>
              <Th fontSize="8px" py={0.5} px={1} isNumeric>
                TOTAL
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, i) => (
              <Tr key={i}>
                <Td py={0.5} px={1} fontSize="8px">
                  {item.itemCode}
                </Td>
                <Td py={0.5} px={1} fontSize="8px">
                  {item.color}
                </Td>
                <Td py={0.5} px={1} isNumeric fontSize="8px">
                  {item.quantity}
                </Td>
                <Td py={0.5} px={1} isNumeric fontSize="8px">
                  {formatCurrency(item.unitPrice)}
                </Td>
                <Td py={0.5} px={1} isNumeric fontSize="8px">
                  {formatCurrency(item.total)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Divider />

      {/* Totals */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Table
          size="sm"
          variant="unstyled"
          fontSize="8px"
          sx={{
            width: "auto",
            td: {
              fontSize: "8px",
              whiteSpace: "nowrap",
              py: 0.5,
              pr: 0,
              "&:first-of-type": {
                pr: 3,
              },
            },
          }}
        >
          <Tbody>
            <Tr fontSize="8px">
              <Td>Subtotal:</Td>
              <Td isNumeric>{formatCurrency(subTotal)}</Td>
            </Tr>
            <Tr fontSize="8px">
              <Td>Discount:</Td>
              <Td isNumeric>{formatCurrency(discount)}</Td>
            </Tr>
            <Tr fontSize="8px">
              <Td>Shipping Cost:</Td>
              <Td isNumeric>{formatCurrency(shippingCost)}</Td>
            </Tr>
            <Tr fontSize="8px">
              <Td>Paid:</Td>
              <Td isNumeric>{formatCurrency(prepaid)}</Td>
            </Tr>
            <Tr fontWeight="bold" fontSize="8px">
              <Td
                borderTopStyle="solid"
                borderTopWidth="0.1px"
                borderColor="gray.100"
              >
                Total Due:
              </Td>
              <Td
                borderTopStyle="solid"
                borderTopWidth="0.1px"
                borderColor="gray.100"
                isNumeric
              >
                {formatCurrency(totalDue)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Footer */}
      <Box
        borderTop="0.5px solid"
        borderColor="gray.300"
        pt={1.5}
        mt="auto"
        fontSize="6pt"
      >
        <Text fontWeight="bold" mb={0.5}>
          Payment Due By: {dueDate.toLocaleDateString()}
        </Text>

        <Text fontWeight="bold" mb={0.5}>
          Terms & Conditions:
        </Text>
        <List spacing={0} mb={1}>
          <ListItem display="flex" alignItems="center">
            <ListIcon as={MdCircle} fontSize="2.5pt" marginRight={0.5} />
            Payment is due within 15 days
          </ListItem>
          <ListItem display="flex" alignItems="center">
            <ListIcon as={MdCircle} fontSize="2.5pt" marginRight={0.5} />
            Please make checks payable to: Today Trend Online Shopping
          </ListItem>
          <ListItem display="flex" alignItems="center">
            <ListIcon as={MdCircle} fontSize="2.5pt" marginRight={0.5} />
            Late payments are subject to a 5% monthly fee
          </ListItem>
        </List>

        <Text fontStyle="italic" fontSize="5.5pt" lineHeight="1.2">
          For any questions about this invoice, please contact: Phone:
          +977-9802359033 | Email: support@todaytrend.com.np
        </Text>
      </Box>
    </Box>
  );
};

export default InvoiceCard;
