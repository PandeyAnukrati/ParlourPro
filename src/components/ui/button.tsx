import * as React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-white font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";
