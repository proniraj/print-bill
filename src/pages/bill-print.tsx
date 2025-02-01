"use client";

import { Container, Stack, Button, HStack, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DataInput from "@/components/DataInput/DataInput";
import DataTable from "@/components/DataTable/DataTable";
import InvoicePrintableContent from "@/components/InvoicePrintableContent/InvoicePrintableContent";
import { ParsedData } from "@/utils/sheetParser";
import { invoiceSchema, ValidationError } from "@/utils/validationSchema";
import { Alert, AlertIcon, VStack } from "@chakra-ui/react";
import { z } from "zod";

const Page = () => {
  const [data, setData] = useState<ParsedData>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const printContentRef = useRef<HTMLDivElement>(null);

  const validateRow = (row: any, rowIndex: number): ValidationError[] => {
    try {
      // Convert string values to numbers for numeric fields
      const processedRow = {
        ...row,
        COD: row.COD ? Number(row.COD) : undefined,
        PP: row.PP ? Number(row.PP) : undefined,
      };

      invoiceSchema.parse(processedRow);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map((err) => ({
          field: err.path[0] as string,
          message: err.message,
          rowIndex,
        }));
      }
      return [];
    }
  };

  const handleDataAvailable = (parsedData: ParsedData) => {
    setData(parsedData);

    // Validate each row
    const errors: ValidationError[] = [];
    parsedData.forEach((row, index) => {
      const rowErrors = validateRow(row, index);
      errors.push(...rowErrors);
    });

    setValidationErrors(errors);
  };

  const handlePrint = useReactToPrint({
    contentRef: printContentRef,
    documentTitle: `Invoices-${new Date().toISOString().split("T")[0]}`,
    pageStyle: `
      @page {
        size: A5 portrait;
        margin: 0mm;
      }
      html, body {
        margin: 0;
        padding: 0;
        width: 148mm;
        height: 210mm;
      }
      .print-page {
        page-break-after: always;
        page-break-inside: avoid;
      }
      .no-print {
        display: none !important;
      }
    `,
  });

  return (
    <>
      <Container
        className="no-print"
        maxW="container.lg"
        py={5}
        color="#262626"
      >
        <Stack spacing={6}>
          <Box>
            <DataInput
              onDataAvailable={handleDataAvailable}
              options={{
                minRequiredCells: 3,
              }}
              headers={[
                "Customer Name",
                "Cell Number",
                "ALT. NUM.",
                "Full Address",
                "Branch",
                "Product",
                "COD",
                "PP",
                "Call 1",
                "Call 2",
                "Call 3",
                "Entry",
                "Call",
                "Status",
                "Instruction",
              ]}
            />
          </Box>

          {validationErrors.length > 0 && (
            <VStack align="stretch" spacing={2}>
              <Alert status="error">
                <AlertIcon />
                Found {validationErrors.length} validation errors
              </Alert>
              {validationErrors.map((error, index) => (
                <Alert key={index} status="error" size="sm">
                  <AlertIcon />
                  Row {error.rowIndex! + 1}: {error.field} - {error.message}
                </Alert>
              ))}
            </VStack>
          )}

          {data.length > 0 && (
            <Box mb={6}>
              <DataTable
                data={[
                  Object.keys(data[0]),
                  ...data.map((row) => Object.values(row)),
                ]}
                hasError={validationErrors.length > 0}
                errors={validationErrors}
                emptyMessage="Upload or paste data to see results"
              />
            </Box>
          )}

          {data?.length > 0 && (
            <HStack>
              <Button
                onClick={() => handlePrint()}
                variant="outline"
                colorScheme="teal"
                leftIcon={<PrintIcon />}
                isDisabled={validationErrors.length > 0}
              >
                Print Invoices
              </Button>
            </HStack>
          )}
        </Stack>
      </Container>

      <Box style={{ display: "none" }}>
        <InvoicePrintableContent ref={printContentRef} data={data} />
      </Box>
    </>
  );
};

const PrintIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
);

export default Page;
