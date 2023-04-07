import React from "react";

export const PageContent = ({
  title,
  description,
  children,
  ...props
}: React.ComponentProps<"div"> & { title: string; description: string }) => (
  <div {...props}>
    <h1 className="text-2xl font-semibold tracking-wide text-gray-200">
      {title}
    </h1>
    <p className="mt-2 tracking-wide text-gray-300/90">{description}</p>
    <div className="mt-6">{children}</div>
  </div>
);
