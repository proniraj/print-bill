import { z } from "zod";

// Helper function to validate product format
const validateProductFormat = (value: string) => {
  // Handle empty string case
  if (!value.trim()) return false;

  const products = value.split(",").map((p) => p.trim());

  const productRegex = /^SB\d{3}\|[^*,|]+(\*\d+)?$/;

  const isValid = products.every((product) => productRegex.test(product));
  if (!isValid) {
    return false;
  }

  // Validate product codes start with SB and have 3 digits
  const hasValidProductCodes = products.every((product) => {
    const code = product.split("|")[0];
    return /^SB\d{3}$/.test(code);
  });

  return hasValidProductCodes;
};

export const invoiceSchema = z.object({
  "CUSTOMER NAME": z.string().min(1, "Customer name is required"),

  "CELL NUMBER": z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .refine(
      (val) => val.startsWith("9"),
      "Nepal phone numbers must start with 9"
    ),

  "ALT. NUM.": z
    .string()
    .regex(/^\d{10}$/, "Alternative number must be exactly 10 digits")
    .refine(
      (val) => !val || val.startsWith("9"),
      "Nepal phone numbers must start with 9"
    )
    .or(z.literal("")) // Allow empty string
    .optional()
    .nullable(),

  "FULL ADDRESS": z.string().min(1, "Address is required"),

  BRANCH: z.string().min(1, "Branch is required"),

  PRODUCT: z
    .string()
    .min(1, "Product is required")
    .refine(
      validateProductFormat,
      "Invalid product format. Must be like: SB101|ProductName*Quantity or SB101|ProductName"
    ),

  COD: z
    .number({
      required_error: "COD is required",
      invalid_type_error: "COD must be a number",
    })
    .nonnegative("COD must be non-negative")
    .or(z.string().regex(/^\d+$/).transform(Number)), // Allow string numbers

  PP: z
    .number({
      invalid_type_error: "PP must be a number",
    })
    .nonnegative("PP must be non-negative")
    .or(z.string().regex(/^\d+$/).transform(Number)) // Allow string numbers
    .or(z.literal("")) // Allow empty string
    .optional()
    .nullable(),
});

export type InvoiceData = z.infer<typeof invoiceSchema>;

// Helper type for validation errors
export type ValidationError = {
  field: string;
  message: string;
  rowIndex?: number;
};
