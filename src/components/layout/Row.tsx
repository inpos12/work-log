import React from "react";

type Props = {
  children: React.ReactNode;
  classname?: string;
};

export default function Row({ children, classname = "" }: Props) {
  return (
    <div className={`flex flex-wrap items-center ${classname}`}>{children}</div>
  );
}
