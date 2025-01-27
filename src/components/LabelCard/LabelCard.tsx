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
  <Box className="customer-info" overflow="hidden">
    <Table size="sm" variant="unstyled" sx={{ tableLayout: "fixed" }}>
      <tbody>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            Name
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["CUSTOMER NAME"]}</Text>
          </Td>
        </Tr>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            Address
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["FULL ADDRESS"]}</Text>
          </Td>
        </Tr>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            Phone
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["CELL NUMBER"]}</Text>
          </Td>
        </Tr>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            Product
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["PRODUCT"]}</Text>
          </Td>
        </Tr>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            Branch
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["BRANCH"]}</Text>
          </Td>
        </Tr>
        <Tr>
          <Td width="55px" px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            COD
          </Td>
          <Td px={0.5} py={labelType === 8 ? 0.25 : 0.5}>
            <Text isTruncated>{data?.["COD"]}</Text>
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
  <Box className="company" textAlign="center" mb={1}>
    <Text
      fontSize={labelType === 8 ? "14px" : "16px"}
      fontWeight="bold"
      lineHeight="1.2"
    >
      {vendor.name}
    </Text>
    <Text fontSize={labelType === 8 ? "12px" : "14px"} lineHeight="1.2">
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
      className="card"
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid black",
        borderRadius: "0.185in",
        padding: labelType === 8 ? "0.08in" : "0.185in",
        display: "flex",
        flexDirection: "column",
        gap: labelType === 8 ? "0.03in" : "0.1in",
        fontSize: labelType === 8 ? "10px" : "14px",
      }}
    >
      <CompanyInfo vendor={selectedVendor} labelType={labelType} />
      <CustomerInfo data={props} labelType={labelType} />
      <Box
        className="card-footer"
        textAlign="center"
        fontSize={labelType === 8 ? "9px" : "12px"}
        mt="auto"
        lineHeight="1.1"
      >
        <Text>Thank you for shopping with us</Text>
        <Text>{selectedVendor.phone}</Text>
      </Box>
    </Box>
  );
};

export default LabelCard;
