import React from "react";

export const HomeWifiIcon = ({
  color,
  ...props
}: React.ComponentProps<"svg"> & { color?: string }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 132.7 132.7"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path
        style={{ fill: color }}
        d="M66.5,130.2c-13.3,0-26.6,0-40,0c-10.6,0-16-5.4-16.1-15.9c0-19.8,0-39.6,0-59.4c0-2.4,0.6-4.9-3.4-5
      c-2.4,0-4.1-2.2-4.4-4.7c-0.4-2.6,0.8-4.5,2.9-5.9c19.2-12,38.4-23.9,57.7-35.8c2.7-1.7,5.1-0.9,7.5,0.6c18.5,11.5,37,23,55.5,34.5
      c2.4,1.5,4.4,3.3,4,6.3c-0.5,3.2-2.4,5.1-5.7,5.3c-3.5,0.2-2.1,2.8-2.2,4.5c-0.1,19.6-0.1,39.3-0.1,58.9c0,11.5-5.2,16.7-16.8,16.7
      C92.4,130.2,79.4,130.2,66.5,130.2z M66.2,118.4c13.2,0,26.3-0.1,39.5,0.1c3.7,0,4.9-1.2,4.9-4.9c-0.1-22.5-0.1-45,0-67.4
      c0-2.7-0.8-4.2-3.1-5.6c-12.5-7.6-25-15.3-37.3-23.2c-2.8-1.8-4.9-1.6-7.6,0.1C50.2,25.4,37.9,33,25.6,40.5c-2.4,1.5-3.4,3-3.4,5.9
      c0.1,22.3,0.2,44.6,0,66.9c0,4.4,1.7,5.3,5.6,5.2C40.5,118.3,53.4,118.4,66.2,118.4z"
      />
      <path
        style={{ fill: color }}
        d="M67.9,66.4c9.9,0.4,19.6,4.5,27.6,12.5c2.7,2.7,4.2,5.8,0.9,9.1c-3.2,3.2-6.1,1.9-9.1-0.7
      C73.5,75,59,75,45.5,87.2c-3.8,3.4-6.9,3.6-9.5,0.6c-2.9-3.5-1.3-6.4,1.4-9.1C45.2,70.9,55.8,66.4,67.9,66.4z"
      />
      <path
        style={{ fill: color }}
        d="M66.2,89.4c6.2,0.3,11.1,2.4,15.1,6.5c2.4,2.5,3,5.3,0.7,8c-2.4,2.9-5.3,3-8.4,0.8c-6.7-4.8-7.7-4.8-14.4,0
      c-3.1,2.2-5.9,2.1-8.4-0.8c-2.3-2.7-1.8-5.5,0.6-8C55.5,91.5,60.7,89.6,66.2,89.4z"
      />
    </g>
  </svg>
);