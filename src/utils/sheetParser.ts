import { ChangeEvent } from "react";
import * as XLSX from "xlsx";

export interface SheetParserOptions {
  requiredFields?: string[];
  minRequiredCells?: number;
  headerRow?: string[];
}

export type ParsedData = Record<string, string>[];

export class SheetParser {
  private static normalizeHeader(header: string): string {
    return header?.toString().trim().toUpperCase() || "";
  }

  private static parseRows(
    data: any[][],
    options: SheetParserOptions = { minRequiredCells: 3 }
  ): ParsedData {
    // Use provided headers or first row
    const headerRowKeys = options.headerRow
      ? options.headerRow.map(this.normalizeHeader)
      : (data[0] as any[]).map(this.normalizeHeader).filter(Boolean);

    // If using provided headers, use all rows as data
    const dataRows = options.headerRow ? data : data.slice(1);

    // Filter out empty rows
    const filteredRows = dataRows.filter(
      (row) => row?.filter(Boolean).length >= (options.minRequiredCells || 3)
    );

    return filteredRows.map((row) => {
      return headerRowKeys.reduce((acc, header, index) => {
        acc[header] = row[index]?.toString() || "";
        return acc;
      }, {} as Record<string, string>);
    });
  }

  static parseFile(
    file: File,
    options?: SheetParserOptions
  ): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const binaryString = event.target?.result;
          const workbook = XLSX.read(binaryString, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          }) as any[][];

          resolve(this.parseRows(data, options));
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsBinaryString(file);
    });
  }

  static parsePastedData(
    text: string,
    options?: SheetParserOptions
  ): ParsedData {
    const rows = text
      .trim()
      .split(/[\r\n]+/)
      .map((row) => row.split(/\t/));

    return this.parseRows(rows, options);
  }
}
