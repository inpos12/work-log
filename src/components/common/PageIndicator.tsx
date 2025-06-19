import React from "react";
import Col from "../layout/Col";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface OwnProps {
  image: StaticImport;
  alt: string;
  title: string;
  buttonname: string;
  firstbuttonname?: string;
  onButtonClick: (e: React.MouseEvent) => void;
  buttonicon: boolean;
}
export const PageIndicator: React.FC<OwnProps> = (props) => {
  return (
    <>
      <Col classname="flex items-center justify-start tracking-[0.25rem] ">
        <Image src={props.image} alt={props.alt} />
        <p className="font-semibold">{props.title}</p>
      </Col>
      <Col classname="flex justify-end">
        <button
          onClick={props.onButtonClick}
          className="flex items-center justify-center gap-5 rounded-lg bg-red-700 p-2 text-white"
        >
          {props.buttonicon && (
            <p className="text-left">{props.firstbuttonname}</p>
          )}

          <p className="text-right">{props.buttonname}</p>
        </button>
      </Col>
    </>
  );
};
