import React from "react";
import { signOut } from "@/auth";
import HeaderComponent from "@/components/ui/Header";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
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
