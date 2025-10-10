import React from "react";

export default function layout({ children }: LayoutProps<"/dashboard">) {
  return <div className="max-w-5xl m-auto">{children}</div>;
}
