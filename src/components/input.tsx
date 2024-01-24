import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const Root = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Root.displayName = "Input";

type InputGroupProps = React.ComponentPropsWithRef<"div">;
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
  return (
    <div ref={ref} {...props} className={cn("flex flex-col gap-2", props.className)}>
      {props.children}
    </div>
  );
});
InputGroup.displayName = "InputGroup";

export const Input = Object.assign(Root, {
  Group: InputGroup,
});
