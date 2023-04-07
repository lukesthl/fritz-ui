import type { ReactNode } from "react";
import React from "react";
import { cn } from "./utils/class.helper";

const Wrapper = ({
  className,
  loading,
  children,
  ...props
}: React.ComponentProps<"dl"> & { loading?: boolean }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { loading } as unknown as typeof child);
    }
    return child;
  });

  return (
    <dl className={cn(className)} {...props}>
      {loading ? childrenWithProps : children}
    </dl>
  );
};

const Item = ({
  className,
  children: [firstChild, secondChild],
  loading,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  children: ReactNode[];
  loading?: boolean;
}) => (
  <div
    className={cn(
      "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
      className
    )}
    {...props}
  >
    <dt className="text-sm text-white/60">{firstChild}</dt>
    <dd
      className={cn("text-sm text-white/80 sm:col-span-2", {
        "my-auto mt-1 h-3 w-16 animate-pulse rounded bg-gray-300/30 md:mt-0 md:h-1/2 md:w-32":
          loading,
        "mt-1 sm:mt-0": !loading,
      })}
    >
      {loading ? "" : secondChild}
    </dd>
  </div>
);

const List = { Wrapper, Item };

export { List };
