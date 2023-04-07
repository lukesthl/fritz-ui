import clsx from "clsx";
import React from "react";
import { RouterIcon } from "./icons/router";

export const Logo = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={clsx("flex items-center justify-center space-x-1", className)}
    {...props}
  >
    <RouterIcon className="h-9 w-9" />
    <span className="whitespace-pre text-lg font-semibold">Fritz-UI</span>
  </div>
);
