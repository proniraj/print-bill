"use client";

import {
  Container,
  Stack,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  HStack,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DataInput from "@/components/DataInput/DataInput";
import DataTable from "@/components/DataTable/DataTable";
import PrintableContent from "@/components/PrintableContent/PrintableContent";
import { ParsedData } from "@/utils/sheetParser";

type TLabelSize = 6 | 8;

const Page = () => {
  const [data, setData] = useState<ParsedData>([]);
  const [labelType, setLabelType] = useState<TLabelSize>(8);
  const printContentRef = useRef<HTMLDivElement>(null);

  const handleDataAvailable = (parsedData: ParsedData) => {
    setData(parsedData);
  };

  const handlePrint = useReactToPrint({
    contentRef: printContentRef,
    documentTitle: `Labels-${new Date().toISOString().split("T")[0]}`,
    bodyClass: "print-page",
    copyShadowRoots: true,
    // print: (target) => {
    //   console.log(target);
    //   return Promise.resolve(window.print());
    // },
    onAfterPrint: () => {
      console.log("Print completed");
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .print-page {
          page-break-after: always;
        }
        .no-print {
          display: none !important;
        }
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
            <Stack direction="row" spacing="3">
              {([8, 6] as TLabelSize[]).map((paper, index) => (
                <Card
                  key={index}
                  maxW="sm"
                  variant={labelType === paper ? "filled" : "outline"}
                  border={labelType === paper ? "2px solid" : "none"}
                  borderColor="teal.500"
                  cursor="pointer"
                  onClick={() => setLabelType(paper)}
                >
                  <CardBody>
                    <Stack spacing="3">
                      <Stack direction="row" justifyContent="space-between">
                        <Heading size="md">
                          Select Paper Size: {paper} Labels
                        </Heading>
                        <Checkbox
                          colorScheme="green"
                          size="lg"
                          isChecked={labelType === paper}
                        />
                      </Stack>
                      <Text>{paper} Labels per page. </Text>
                      <Text color="blue.600">A4 Size</Text>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          )}

          {data?.length > 0 && (
            <HStack>
              <Button
                onClick={() => handlePrint()}
                variant="outline"
                colorScheme="teal"
                leftIcon={<PrintIcon />}
              >
                Print Labels
              </Button>
            </HStack>
          )}
        </Stack>
      </Container>

      <Box style={{ display: "none" }}>
        <PrintableContent
          ref={printContentRef}
          data={data}
          labelType={labelType}
        />
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
