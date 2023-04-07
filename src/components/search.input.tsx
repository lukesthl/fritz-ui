import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

export const SearchInput = ({
  className,
  onClear,
  ...props
}: React.ComponentProps<"input"> & { onClear?: () => void }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className={clsx(
          "block rounded-lg border border-white/20 bg-white/10 px-2 py-2.5 pl-9 text-sm text-white/80 focus:border-white/40 focus:outline-none focus:ring-0",
          className
        )}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {props.value && onClear && (
          <XMarkIcon
            className="h-4 w-4 text-gray-400"
            onClick={() => onClear?.()}
          />
        )}
      </div>
    </div>
  );
};
