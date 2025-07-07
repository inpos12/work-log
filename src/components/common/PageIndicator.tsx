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
  display?: string;
}
export const PageIndicator: React.FC<OwnProps> = (props) => {
  return (
    <header className="w-full">
      <Col classname=" py-3 px-2 ">
        <div className="flex items-center justify-between">
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
              style={{ display: props?.display }}
              className="flex items-center justify-center gap-5 rounded-lg bg-red-700 p-2 text-white"
            >
              {props.buttonicon && (
                <p className="text-left">{props.firstbuttonname}</p>
              )}

              <p className="text-right">{props.buttonname}</p>
            </button>
          </Col>
        </div>
        <div className="w-full border-b-[1px] border-gray-200 py-2" />
      </Col>
    </header>
  );
};
