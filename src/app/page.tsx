"use client";

import React from "react";
import { jsonSchema, type JsonSchema } from "./_lib/schemas/input-json";
import { isValidJSON } from "./_lib/utils/is-valid-json";
import { FactoryForm } from "./_lib/components/factory-form";
import { Button } from "@/components/button";
import { Textarea } from "@/components/textarea";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const [schema, setSchema] = React.useState<JsonSchema | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("schema") as HTMLTextAreaElement | null)?.value;
    if (value === undefined) {
      toast.error("Value is undefined");
      return;
    }

    const result = isValidJSON(value);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    const parsedSchema = jsonSchema.safeParse(result.data);
    if (!parsedSchema.success) {
      window.alert(`Invalid schema: ${parsedSchema.error.flatten().formErrors.join(", ")}`);
      return;
    }

    setSchema(parsedSchema.data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-bold tracking-tight sm:text-[5rem]">
          Factory <span className="text-[hsl(280,100%,70%)]">Pattern</span>
        </h1>

        <form className="flex w-full flex-col items-center justify-center gap-4" onSubmit={onSubmit}>
          <Textarea placeholder="Enter the JSON schema" id="schema" className="h-96 text-2xl" />

          <Button type="submit">Submit</Button>
        </form>
      </div>

      {schema !== null && <FactoryForm schema={schema} key={JSON.stringify(schema)} />}
    </main>
  );
};

export default Home;
