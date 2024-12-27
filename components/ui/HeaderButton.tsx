import Link from "next/link";
import React, { ReactNode } from "react";
export interface HeaderButtonComponent {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}
export const HeaderButtonComponent: React.FC<HeaderButtonComponent> = (
  props
) => {
  return (
    <div
      className="
      flex items-center h-8 mr-0 sm:mr-3 px-0.5 rounded-xl text-sm shrink-0 
      bg-components-main-nav-nav-button-bg-active shadow-md
      false
    "
    >
      <Link href={props.href}>
        <div className="flex items-center h-7 px-2.5 cursor-pointer rounded-[10px] text-components-main-nav-nav-button-text-active undefined">
          <div className="mr-2">{props.icon}</div>
          {props.children}
        </div>
      </Link>
    </div>
  );
};
