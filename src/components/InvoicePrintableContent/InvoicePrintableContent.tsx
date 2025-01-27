import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import InvoicePage from "../InvoicePage/InvoicePage";
import { ParsedData } from "@/utils/sheetParser";

interface InvoicePrintableContentProps {
  data: ParsedData;
}

export const InvoicePrintableContent = forwardRef<
  HTMLDivElement,
  InvoicePrintableContentProps
>(({ data }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        "@media screen": {
          ".print": {
            display: "none",
          },
        },
      }}
    >
      <style>
        {`
          @page { 
            size: A5 portrait;
            margin: 0;
          }
          @media print {
            html, body { 
              width: 148mm;
              height: 210mm;
              margin: 0;
              padding: 0;
            }
            .print { 
              display: block !important;
            }
            .print-page { 
              width: 148mm;
              min-height: 209mm;
              padding: 10mm;
              margin: 0 auto;
              page-break-after: always;
              page-break-inside: avoid;
            }
            .no-print { 
              display: none !important;
            }
          }
        `}
      </style>
      <InvoicePage data={data} />
    </Box>
  );
});

InvoicePrintableContent.displayName = "InvoicePrintableContent";

export default InvoicePrintableContent;
