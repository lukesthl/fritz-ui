import React from "react";
import { cn } from "./utils/class.helper";

const Wrapper = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-white/20 shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("bg-white/10 px-4 py-3.5 sm:px-6", className)} {...props}>
    <h3 className="text-lg font-medium leading-6 text-white/90">{children}</h3>
  </div>
);

const Content = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "box-blur border-t border-white/20 bg-[#191A23]/30 shadow-white/10",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Card = { Wrapper, Header, Content };

export { Card };
