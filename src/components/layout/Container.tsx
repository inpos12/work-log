import React from "react";

type Props = {
  children: React.ReactNode;
  classname?: string;
};

export default function Container({ children, classname }: Props) {
  return <div className={`container mx-auto ${classname}`}>{children}</div>;
}
