import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithRef<"label"> & {
  required?: boolean;
};
export const Label = React.forwardRef<HTMLLabelElement, Props>(({ children, required = false, ...props }, ref) => {
  return (
    <label {...props} ref={ref} className={cn("flex flex-col gap-1", props.className, required && "flex-row")}>
      {children}
    </label>
  );
});
Label.displayName = "Label";
