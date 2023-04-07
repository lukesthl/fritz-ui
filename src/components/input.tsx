import React from "react";
import { clsx } from "clsx";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<"input">) => (
  <input
    className={clsx(
      className,
      "rounded-md border border-white/20 bg-white/10 py-2.5 px-5 text-white/90 transition-all duration-100 ease-in-out placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-white/80"
    )}
    {...props}
  />
);
