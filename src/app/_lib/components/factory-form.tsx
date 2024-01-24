"use client";

import React, { useState } from "react";
import { type JsonSchema } from "@/app/_lib/schemas/input-json";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Button } from "@/components/button";
import toast from "react-hot-toast";
import { RequiredStar } from "@/components/required-star";

type FactoryFormProps = {
  schema: JsonSchema;
};
export const FactoryForm: React.FC<FactoryFormProps> = ({ schema }) => {
  const [formState, setFormState] = useState(
    schema.reduce(
      (acc, field) => {
        if (field.defaultValue !== undefined) {
          acc[field.id] = field.defaultValue;
        }
        return acc;
      },
      {} as Record<string, string | number | boolean>
    )
  );

  function handleChange(id: string, type: string) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: string | number | boolean;

      switch (type) {
        case "number":
          value = (event.target as HTMLInputElement).valueAsNumber;
          break;
        case "boolean":
          value = (event.target as HTMLInputElement).checked;
          break;
        default:
          value = event.target.value;
      }

      setFormState({
        ...formState,
        [id]: value,
      });
    };
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    toast.success(<code>{JSON.stringify(formState, null, 2)}</code>, {
      duration: 10000,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-24">
      {schema.map((field) => {
        switch (field.type) {
          case "string":
          case "number":
            return (
              <Input.Group key={field.id}>
                <Label required={field.required} htmlFor={field.id}>
                  {field.label}
                  {field.required && <RequiredStar />}
                </Label>

                <Input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  onChange={handleChange(field.id, field.type)}
                />
              </Input.Group>
            );
          case "boolean":
            return (
              <Input.Group key={field.id}>
                <Label required={field.required} htmlFor={field.id}>
                  {field.label}
                  {field.required && <RequiredStar />}
                </Label>

                <Input
                  id={field.id}
                  type="checkbox"
                  defaultChecked={field.defaultValue}
                  onChange={handleChange(field.id, field.type)}
                />
              </Input.Group>
            );
          case "select":
            return (
              <Input.Group key={field.id}>
                <Label required={field.required} htmlFor={field.id}>
                  {field.label}
                  {field.required && <RequiredStar />}
                </Label>

                <Select
                  id={field.id}
                  required={field.required}
                  defaultValue={field.defaultValue ?? field.options.at(0)?.value}
                  onChange={handleChange(field.id, field.type)}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Input.Group>
            );
          default:
            return null;
        }
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};
