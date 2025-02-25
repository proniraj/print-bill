import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import LabelPage from "../LabelPage/LabelPage";
import { ParsedData } from "@/utils/sheetParser";

interface PrintableContentProps {
  data: ParsedData;
  labelType: 6 | 8;
}

export const PrintableContent = forwardRef<
  HTMLDivElement,
  PrintableContentProps
>(({ data, labelType }, ref) => {
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
            size: A4; 
            margin: 0;
          }
          @media print {
            html, body { 
              width: 8.27in;
              height: 11.69in;
              margin: 0;
              padding: 0;
            }
            .print { 
              display: block !important;
              height: auto;
              max-height: 11.69in;
              width: 8.27in;
              padding: 0;
              line-height: 0.5;
            }
            .print-page { 
              page-break-after: always;
              page-break-inside: avoid;
            }
            .no-print { 
              display: none !important;
            }
          }
        `}
      </style>
      <LabelPage data={data} labelType={labelType} />
    </Box>
  );
});

PrintableContent.displayName = "PrintableContent";

export default PrintableContent;
