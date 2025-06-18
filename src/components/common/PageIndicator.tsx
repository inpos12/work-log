import React from "react";
import Col from "../layout/Col";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface OwnProps {
  image: StaticImport;
  alt: string;
  title: string;
}
export const PageIndicator: React.FC<OwnProps> = (props) => {
  return (
    <>
      <Col classname="flex items-center justify-start tracking-[0.25rem] ">
        <Image src={props.image} alt={props.alt} />
        <p className="font-semibold">{props.title}</p>
      </Col>
    </>
  );
};
