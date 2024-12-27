import UserAvatar from "@/components/ui/UserAvatar";
import { Typography } from "@mui/material";
import React from "react";
import { HeaderButtonComponent } from "./HeaderButton";

export interface HeaderComponent {
  signOut: () => void;
}

export const HeaderComponent: React.FC<HeaderComponent> = ({ signOut }) => {
  return (
    <div className="p-2 flex justify-between items-center">
      <Typography>Voice-Ping</Typography>
      <div className="flex ">
        <HeaderButtonComponent
          href="/dashboard"
          icon={
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="remixicon w-4 h-4"
            >
              <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z"></path>
            </svg>
          }
        >
          ボット
        </HeaderButtonComponent>
        <HeaderButtonComponent
          href="/dashboard"
          icon={
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="mr-2 w-4 h-4"
            >
              <path d="M17 8V2H20C20.5523 2 21 2.44772 21 3V7C21 7.55228 20.5523 8 20 8H17ZM15 22C15 22.5523 14.5523 23 14 23H10C9.44772 23 9 22.5523 9 22V8H2.5V6.07437C2.5 5.7187 2.68891 5.3898 2.99613 5.21059L8.5 2H15V22Z"></path>
            </svg>
          }
        >
          ツール
        </HeaderButtonComponent>
      </div>
      <div className="flex items-center gap-1">
        <UserAvatar />
        <form action={signOut}>
          <button type="submit">ログアウト</button>
        </form>
      </div>
    </div>
  );
};

export default HeaderComponent;
