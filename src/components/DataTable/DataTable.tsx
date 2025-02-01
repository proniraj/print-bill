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
  Tooltip,
} from "@chakra-ui/react";
import { ValidationError } from "@/utils/validationSchema";

interface DataTableProps {
  headers?: string[];
  data: string[][];
  emptyMessage?: string;
  hasError?: boolean;
  errors?: ValidationError[];
}

export default function DataTable({
  headers,
  data,
  emptyMessage = "No data available",
  hasError = false,
  errors = [],
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

  const getCellError = (rowIndex: number, header: string) => {
    return errors.find(
      (error) => error.rowIndex === rowIndex && error.field === header
    );
  };

  return (
    <TableContainer>
      <Table
        variant="simple"
        size="sm"
        sx={
          hasError
            ? {
                borderColor: "red.500",
                borderWidth: "1px",
                borderStyle: "solid",
              }
            : {}
        }
      >
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
              {row.map((cell, cellIndex) => {
                const error = getCellError(rowIndex, tableHeaders[cellIndex]);
                return (
                  <Tooltip
                    key={cellIndex}
                    isDisabled={!error}
                    label={error?.message}
                    hasArrow
                    placement="top"
                  >
                    <Td
                      sx={
                        error
                          ? {
                              color: "red.500",
                              borderColor: "red.500",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              cursor: "pointer",
                            }
                          : {}
                      }
                    >
                      {cell}
                    </Td>
                  </Tooltip>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
