import { FC } from "react";
import { Box } from "@chakra-ui/react";
import LabelCard from "../LabelCard/LabelCard";
import { ParsedData } from "@/utils/sheetParser";

interface LabelPageProps {
  data: ParsedData;
  labelType: 6 | 8;
}

export const LabelPage: FC<LabelPageProps> = ({ data, labelType }) => {
  const labelsPerPage = labelType;
  const pages = Math.ceil(data.length / labelsPerPage);

  return [...Array(pages)].map((_, pageIndex) => (
    <Box className="print" key={pageIndex}>
      <Box
        className="print-page"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows:
            labelType === 8 ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
          gap: "0",
          width: "8.27in",
          height: "11.69in",
          padding: "0.346in 0.25in 0 0.25in",
          pageBreakAfter: "always",
          pageBreakInside: "avoid",
        }}
      >
        {data
          .slice(pageIndex * labelsPerPage, (pageIndex + 1) * labelsPerPage)
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "3.902in",
                height: labelType === 8 ? "2.775in" : "3.776in",
                padding: "0.185in",
                pageBreakInside: "avoid",
              }}
            >
              <LabelCard labelType={labelType} {...item} />
            </Box>
          ))}
      </Box>
    </Box>
  ));
};

export default LabelPage;
