import Head from "next/head";
import { FC, MouseEventHandler, PropsWithChildren, useState } from "react";
import "../styles/Home.module.css";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import useNewWindow from "@/hooks/useNewWindow";
import parseSheetInputData, { EFields, TField } from "@/utils/fileReader";

export default function Home() {
  const { openInNewWindow } = useNewWindow();

  const [fields, setFields] = useState<TField[]>([]);

  const PrintableArea = () => {
    return <VoucherCards fields={fields} />;
  };

  const openPrintWindow: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (fields.length === 0) {
      return alert("No data to print");
    }
    openInNewWindow(PrintableArea);
  };

  return (
    <>
      <Head>
        <title>Today Trend | Bill Printing</title>
        <meta name="description" content="Today Trend Bill Printing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        className="no-print"
        maxW="container.lg"
        py={5}
        color="#262626"
      >
        <chakra.form>
          <Stack spacing={4}>
            <FormControl isInvalid={false}>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => parseSheetInputData(e, setFields)}
                accept=".xlsx"
              />
              <FormHelperText>
                Download the template file.{" "}
                <Button
                  as={"a"}
                  href="/template.xlsx"
                  download
                  variant="link"
                  colorScheme="teal"
                >
                  Download Template
                </Button>
              </FormHelperText>
              <FormHelperText>
                Download the voucher page.{" "}
                <Button
                  as={"a"}
                  href="/voucher.pdf"
                  download
                  variant="link"
                  colorScheme="teal"
                >
                  Download Template
                </Button>
              </FormHelperText>
            </FormControl>

            <HStack>
              <Button
                onClick={openPrintWindow}
                variant="outline"
                colorScheme="teal"
              >
                Print
              </Button>

              <Button as={Link} href="/" variant="link" colorScheme="teal">
                Label Print
              </Button>
            </HStack>
          </Stack>
        </chakra.form>
      </Container>

      <TableContainer className="no-print">
        {fields.length > 0 && (
          <Table className="table no-print" variant="simple">
            <Thead>
              <Tr>
                {Object.values(EFields).map((field, i) => (
                  <Th key={i}>{field}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((item, index) => (
                <Tr key={index}>
                  {Object.values(EFields).map((field) => (
                    <Td key={item[field]}>{item[field]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

type Props = { fields: TField[] };

const VoucherCards: FC<Props> = ({ fields }) => {
  const total = fields.length;
  const maxPage = Math.ceil(total / 6);
  return Array.from({ length: maxPage }).map((_, i) => (
    <PageWrapper key={i}>
      {fields.slice(i * 6, i * 6 + 6).map((item, index) => (
        <Card key={index} label={item?.NAME} />
      ))}
    </PageWrapper>
  ));
};

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

type CardProps = { label?: string };

const Card: FC<CardProps> = ({ label }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <p
        style={{
          position: "absolute",
          top: "36%",
          left: "28.92%",
          width: "calc(100% - 30%)",
          height: "auto",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
};
