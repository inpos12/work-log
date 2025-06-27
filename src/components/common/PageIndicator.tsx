import React from "react";
import Col from "../layout/Col";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface OwnProps {
  imageboolen: boolean;
  image?: StaticImport;
  iconboolen: boolean;
  icon?: React.ReactNode;
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
        {props.imageboolen && (
          <Image src={props.image!} alt={props.alt} className="h-10 w-10" />
        )}
        {props.iconboolen && props.icon}
        <p className="ml-3 font-semibold">{props.title}</p>
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
