import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithRef<"select">;

export const Select = React.forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <select
    {...props}
    ref={ref}
    className={cn(
      "block w-full rounded-md border border-border bg-background px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[hsl(280,100%,70%)] focus:ring-offset-2",
      props.className
    )}
  />
));
Select.displayName = "Select";
