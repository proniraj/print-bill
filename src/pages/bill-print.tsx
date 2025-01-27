"use client";

import { Container, Stack, Button, HStack, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DataInput from "@/components/DataInput/DataInput";
import DataTable from "@/components/DataTable/DataTable";
import InvoicePrintableContent from "@/components/InvoicePrintableContent/InvoicePrintableContent";
import { ParsedData } from "@/utils/sheetParser";

const Page = () => {
  const [data, setData] = useState<ParsedData>([]);
  const printContentRef = useRef<HTMLDivElement>(null);

  const handleDataAvailable = (parsedData: ParsedData) => {
    setData(parsedData);
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

          {data.length > 0 && (
            <Box mb={6}>
              <DataTable
                data={[
                  Object.keys(data[0]),
                  ...data.map((row) => Object.values(row)),
                ]}
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
