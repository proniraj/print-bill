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
    <Box ref={ref}>
      <style>
        {`
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
