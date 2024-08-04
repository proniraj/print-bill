import { ChangeEvent, ChangeEventHandler } from "react";
import * as XLSX from "xlsx";

export enum EVendor {
  TODAYTREND = "TODAYTREND",
  DRESSBERRY = "DRESSBERRY",
  MANTRAMART = "MANTRAMART",
  VANESSA = "VANESSA",
  DALICART = "DALICART",
}

export enum EFields {
  SN = "SN",
  NAME = "NAME",
  ADDRESS = "ADDRESS",
  PHONE = "PHONE",
  PRODUCT = "PRODUCT",
  COD = "COD",
  BRANCH = "BRANCH",
  VENDOR = "VENDOR",
}

export type TField = Record<EFields, string> &
  {
    VENDOR: EVendor;
  }[];

const parseSheetInputData = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (data: TField[]) => void
) => {
  e.preventDefault();
  const file = e?.target?.files?.[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const binaryString = event.target?.result;
    const workbook = XLSX.read(binaryString, { type: "binary" });
    const sheetName = workbook.SheetNames[0]; // Assuming reading the first sheet

    const sheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const headerRow = (excelData?.[0] as string[]) || [];
    const headerRowKeys = headerRow.map((header) => header.toUpperCase());

    const dataRows = (excelData.slice(1) as string[][]).filter(
      (item) => item?.filter((cell) => Boolean(cell)).length > 3
    );

    const fields = Object.values(EFields);

    const fieldsIndex = fields.reduce((acc, field) => {
      if (headerRowKeys.indexOf(field) !== -1)
        acc[field] = headerRowKeys.indexOf(field) as number;
      return acc;
    }, {} as Record<EFields, number>);

    const dataRowsObj = dataRows.map((row) => {
      return fields.reduce((acc, cell, index) => {
        return {
          ...acc,
          [cell]: row[
            fieldsIndex[cell as EFields] as number
          ] as TField[EFields],
        };
      }, {} as TField);
    });

    callback(dataRowsObj);
  };

  if (file) {
    reader.readAsBinaryString(file);
  }
};

export default parseSheetInputData;
