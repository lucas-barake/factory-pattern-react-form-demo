import { z } from "zod";

const textInputSchema = z.object({
  id: z.string(),
  type: z.literal("string"),
  label: z.string(),
  placeholder: z.string(),
  required: z.boolean(),
  length: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .refine(
      (length) => {
        return length.min !== undefined && length.max !== undefined ? length.max > length.min : true;
      },
      {
        message: "If both min and max lengths are defined, max must be greater than min",
      }
    ),
  defaultValue: z.string().optional(),
});

const numberInputSchema = z.object({
  id: z.string(),
  type: z.literal("number"),
  label: z.string(),
  placeholder: z.string(),
  required: z.boolean(),
  min: z.number().optional(),
  max: z.number().optional(),
  defaultValue: z.number().optional(),
});

const booleanInputSchema = z.object({
  id: z.string(),
  type: z.literal("boolean"),
  label: z.string(),
  required: z.boolean(),
  defaultValue: z.boolean().optional(),
});

const selectInputSchema = z
  .object({
    id: z.string(),
    type: z.literal("select"),
    label: z.string(),
    required: z.boolean(),
    options: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    defaultValue: z.string().optional(),
  })
  .refine((select) => {
    return select.defaultValue !== undefined
      ? select.options.some((option) => option.value === select.defaultValue)
      : true;
  }, "defaultValue must be a valid value from options");

export const inputSchema = z.union([textInputSchema, numberInputSchema, booleanInputSchema, selectInputSchema]);

export const jsonSchema = z.array(inputSchema).min(1);
export type JsonSchema = z.infer<typeof jsonSchema>;
