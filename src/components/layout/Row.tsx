import React from "react";

type Props = {
  children: React.ReactNode;
  classname?: string;
};

export default function Row({ children, classname = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border border-white/20 bg-white/10 p-6 shadow-md backdrop-blur-md ${classname}`}
    >
      {children}
    </div>
  );
}
