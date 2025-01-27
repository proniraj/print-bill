import { FC } from "react";
import { EFields, EVendor } from "@/utils/fileReader";
import LabelCard from "../LabelCard/LabelCard";

interface LabelProps extends Record<EFields, string> {
  size?: 6 | 8;
}

export const Label: FC<LabelProps> = ({ size = 8, ...props }) => {
  return <LabelCard labelType={size} {...props} />;
};

export default Label;
