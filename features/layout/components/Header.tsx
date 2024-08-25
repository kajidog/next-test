import { signOut } from "@/auth";
import HeaderComponent from "@/components/ui/Header";
import React from "react";

export interface Header {}

export const Header: React.FC<Header> = () => {
  return (
    <HeaderComponent
      signOut={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    />
  );
};

export default Header;
