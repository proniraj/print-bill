import { FC } from "react";
import { Box } from "@chakra-ui/react";
import InvoiceCard from "../InvoiceCard/InvoiceCard";
import { ParsedData } from "@/utils/sheetParser";

interface InvoicePageProps {
  data: ParsedData;
}

export const InvoicePage: FC<InvoicePageProps> = ({ data }) => {
  return data.map((item, index) => (
    <Box
      key={index}
      className="print"
      sx={{
        display: "block",
        pageBreakAfter: "always",
        pageBreakInside: "avoid",
      }}
    >
      <Box
        className="print-page"
        sx={{
          width: "148mm",
          minHeight: "209mm",
          padding: "10mm",
          margin: "0 auto",
          backgroundColor: "white",
          boxSizing: "border-box",
          "@media print": {
            pageBreakAfter: "always",
            pageBreakInside: "avoid",
          },
        }}
      >
        <InvoiceCard {...item} />
      </Box>
    </Box>
  ));
};

export default InvoicePage;
