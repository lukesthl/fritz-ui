import React from "react";
import { v4 as uuidv4 } from "uuid";

export const BatteryIcon = ({
  level,
  color,
  id = uuidv4(),
  ...props
}: React.ComponentProps<"svg"> & { level: number; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
    {...props}
  >
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop
          id="stop1"
          offset={level / 100}
          stopColor={color || "currentColor"}
        />
        <stop
          id="stop2"
          offset={level / 100}
          stopColor="#ffffff"
          stopOpacity="0.3"
        />
      </linearGradient>
    </defs>
    <path
      fill={`url(#${id})`}
      d="M4.75 8a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75h-9.5z"
    />
    <path
      fillRule="evenodd"
      d="M1 7.25A2.25 2.25 0 013.25 5h12.5A2.25 2.25 0 0118 7.25v1.085a1.5 1.5 0 011 1.415v.5a1.5 1.5 0 01-1 1.415v1.085A2.25 2.25 0 0115.75 15H3.25A2.25 2.25 0 011 12.75v-5.5zm2.25-.75a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75v-5.5a.75.75 0 00-.75-.75H3.25z"
      clipRule="evenodd"
    />
  </svg>
);
