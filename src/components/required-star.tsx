import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithRef<"span">;
export const RequiredStar = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return (
    <span ref={ref} {...props} className={cn("font-bold text-destructive", props.className)}>
      *
    </span>
  );
});
RequiredStar.displayName = "RequiredStar";
