import { FC } from "react";
import Image from "next/image";
import { Box, Table, Tr, Td, Text } from "@chakra-ui/react";
import { EFields, EVendor } from "@/utils/fileReader";

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

interface LabelCardProps extends Record<string, string | number> {
  labelType: number;
}

const CustomerInfo: FC<any> = ({ data, labelType }) => (
  <Box className="customer-info" overflow="hidden" flex="1">
    <Table
      size="sm"
      variant="unstyled"
      sx={{
        tableLayout: "fixed",
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            Name
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["CUSTOMER NAME"]}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            Address
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["FULL ADDRESS"]}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            Phone
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["CELL NUMBER"]}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            Product
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["PRODUCT"]}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            Branch
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["BRANCH"]}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td
            width="45px"
            px={1}
            py={0.5}
            whiteSpace="nowrap"
            fontSize={labelType === 8 ? "9px" : "11px"}
          >
            COD
          </Td>
          <Td px={1} py={0.5}>
            <Text isTruncated fontSize={labelType === 8 ? "9px" : "11px"}>
              {data?.["COD"]}
            </Text>
          </Td>
        </Tr>
      </tbody>
    </Table>
  </Box>
);

const CompanyInfo: FC<{
  vendor: (typeof vendor)[EVendor];
  labelType: number;
}> = ({ vendor, labelType }) => (
  <Box textAlign="center" mb={1}>
    <Text
      fontSize={labelType === 8 ? "11px" : "13px"}
      fontWeight="bold"
      lineHeight="1.1"
    >
      {vendor.name}
    </Text>
    <Text fontSize={labelType === 8 ? "9px" : "11px"} lineHeight="1.1">
      {vendor.address}
    </Text>
  </Box>
);

const CompanyLogo: FC<{ logo: string; labelType: number }> = ({
  logo,
  labelType,
}) => (
  <Box className="logo" height={labelType === 8 ? "30px" : "40px"} mb={1}>
    <Image
      src={"/" + logo.toLowerCase().replace(" ", "_")}
      alt="Company logo"
      width={labelType === 8 ? 150 : 200}
      height={labelType === 8 ? 30 : 40}
      style={{
        filter: "grayscale(100%)",
        objectFit: "contain",
      }}
    />
  </Box>
);

export const LabelCard: FC<LabelCardProps> = (props) => {
  const { VENDOR, labelType = 8 } = props;
  const selectedVendor =
    vendor?.[VENDOR as EVendor] || vendor[EVendor.TODAYTREND];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid black",
        borderRadius: "0.185in",
        padding: labelType === 8 ? "0.06in" : "0.12in",
        display: "flex",
        flexDirection: "column",
        gap: labelType === 8 ? "0.02in" : "0.08in",
        fontSize: labelType === 8 ? "9px" : "11px",
        overflow: "hidden",
        "@media print": {
          pageBreakInside: "avoid",
        },
      }}
    >
      <CompanyInfo vendor={selectedVendor} labelType={labelType} />
      <CustomerInfo data={props} labelType={labelType} />
      <Box
        textAlign="center"
        fontSize={labelType === 8 ? "8px" : "10px"}
        mt="auto"
        lineHeight="1"
      >
        <Text>Thank you for shopping with us</Text>
        <Text>{selectedVendor.phone}</Text>
      </Box>
    </Box>
  );
};

export default LabelCard;
