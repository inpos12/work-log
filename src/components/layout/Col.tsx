// components/layout/Col.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  perRow?: number;
  classname?: string;
};

export default function Col({ children, perRow = 2, classname }: Props) {
  return (
    <>
      <div className={`${classname}`}>{children}</div>
    </>
  );
}
