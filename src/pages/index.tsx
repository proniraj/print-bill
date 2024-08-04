import Head from "next/head";
import { FC, MouseEventHandler, useState } from "react";
import "../styles/Home.module.css";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  chakra,
  Text,
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
import parseSheetInputData, { EFields, EVendor } from "@/utils/fileReader";

const vendor: Record<
  EVendor,
  {
    name: string;
    address: string;
    phone: string;
    logo: string;
  }
> = {
  TODAYTREND: {
    name: "Today Trend",
    address: "Ranibari, Kathmandu",
    phone: "+977 982-0135145",
    logo: "today_trend_logo.png",
  },
  MANTRAMART: {
    name: "Mantra Mart",
    address: "Ranibari, Kathmandu",
    phone: "+977 970-3726062",
    logo: "mantra_mart_logo.png",
  },
  DRESSBERRY: {
    name: "Dress Berry",
    address: "Ranibari, Kathmandu",
    phone: "+977 982-0135145",
    logo: "dress_berry_logo.png",
  },
  VANESSA: {
    name: "Vanessa",
    address: "Ranibari, Kathmandu",
    phone: "+977 982-0135145",
    logo: "vanessa_logo.png",
  },
  DALICART: {
    name: "Dali.Com",
    address: "Kathmandu, Sorakhutte",
    phone: "+977 01-4952477",
    logo: "dali_cart_logo.png",
  },
};

type TField = Record<EFields, string> &
  {
    VENDOR: EVendor;
  }[];

type TLabelSize = 6 | 8;

export default function Home() {
  const [fields, setFields] = useState<TField[]>([]);
  const [labelType, setLabelType] = useState<TLabelSize>(8);

  const handlePrint: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.print();
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
            </FormControl>

            <Stack direction="row" spacing="3" my={2}>
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

            <HStack>
              <Button
                onClick={handlePrint}
                variant="outline"
                colorScheme="teal"
              >
                Print
              </Button>

              <Button
                as={Link}
                href="/voucher"
                variant="link"
                colorScheme="teal"
              >
                Voucher Print
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
      {fields.length > 0 && (
        <>
          {new Array(Math.ceil(fields.length / labelType))
            .fill(0)
            .map((itm, i) => (
              <div className="print" key={i}>
                {fields
                  .slice(i * labelType, i * labelType + labelType)
                  .map((item, index) => (
                    <BillCard {...item} labelType={labelType} key={index} />
                  ))}
              </div>
            ))}
        </>
      )}
    </>
  );
}

const BillCard: FC<
  Record<EFields, string> & {
    labelType: number;
  }
> = ({ NAME, ADDRESS, PHONE, PRODUCT, COD, BRANCH, VENDOR, labelType = 8 }) => {
  const selectedVendor =
    vendor?.[VENDOR as EVendor] || vendor[EVendor.TODAYTREND];
  return (
    <div className={`card-container card-${labelType}`}>
      <div className="card">
        <div className="card-header">
          {labelType !== 8 && (
            <div className="logo">
              <Image
                src={"/" + selectedVendor?.logo.toLowerCase().replace(" ", "_")}
                alt="Picture of the author"
                width={200}
                height={50}
                style={{
                  filter: "grayscale(100%)",
                }}
              />
            </div>
          )}
          <div className="company">
            <p className="name">{selectedVendor?.name}</p>
            <p className="add">{selectedVendor?.address}</p>
          </div>

          <div className="customer-info">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{NAME}</td>
                </tr>

                <tr>
                  <td>Address:</td>
                  <td>{ADDRESS}</td>
                </tr>

                <tr>
                  <td>Phone:</td>
                  <td>{PHONE}</td>
                </tr>

                <tr>
                  <td>Product:</td>
                  <td>{PRODUCT}</td>
                </tr>

                <tr>
                  <td>Branch:</td>
                  <td>{BRANCH}</td>
                </tr>

                <tr>
                  <td>COD:</td>
                  <td>{COD}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <p>Thank you for shopping with us</p>
            <p>{selectedVendor?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
