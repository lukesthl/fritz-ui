import React from "react";
import { clsx } from "clsx";

interface IProps {
  loading?: boolean;
  type?: "primary" | "secondary";
  buttonType?: "button" | "submit" | "reset";
}

export const Button = ({
  type = "primary",
  className,
  loading,
  children,
  buttonType = "button",
  ...props
}: Omit<React.ComponentProps<"button">, "type"> & IProps) => (
  <div>
    <button
      className={clsx(className, {
        "inline-flex items-center space-x-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white/90  duration-200 ease-in-out hover:bg-white/20 focus:outline-none":
          type === "secondary",
        "px-8": loading && type === "secondary",
        "rounded-md border border-none bg-black bg-gradient-to-r from-primary-500/30 to-primary-500/60 py-2.5 px-5 font-medium text-white/90 transition-colors duration-200 ease-in-out hover:bg-[#2D2E37]/20 focus:outline-none":
          type === "primary",
      })}
      type={buttonType}
      {...props}
    >
      {loading ? (
        <span
          className={clsx("inline-flex items-center gap-px", {
            "mb-2": type !== "secondary",
            "my-1.5": type === "secondary",
          })}
        >
          <span className="mx-px h-1.5 w-1.5 animate-blink rounded-full bg-white" />
          <span className="mx-px h-1.5 w-1.5 animate-blink rounded-full bg-white animation-delay-150" />
          <span className="mx-px h-1.5 w-1.5 animate-blink rounded-full bg-white animation-delay-300" />
        </span>
      ) : (
        children
      )}
    </button>
  </div>
);
