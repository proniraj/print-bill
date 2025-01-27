import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
} from "@chakra-ui/react";

interface DataTableProps {
  headers?: string[];
  data: string[][];
  emptyMessage?: string;
}

export default function DataTable({
  headers,
  data,
  emptyMessage = "No data available",
}: DataTableProps) {
  if (!data.length) {
    return (
      <Box py={4} textAlign="center">
        <Text color="gray.500">{emptyMessage}</Text>
      </Box>
    );
  }

  // If headers are not provided, use first row as headers
  const tableHeaders = headers || data[0];
  const tableData = headers ? data : data.slice(1);

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {tableHeaders.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
