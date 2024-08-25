import UserAvatar from "@/components/ui/UserAvatar";
import { Typography } from "@mui/material";
import React from "react";

export interface HeaderComponent {
  signOut: () => void;
}

export const HeaderComponent: React.FC<HeaderComponent> = ({ signOut }) => {
  return (
    <div className="p-2 flex justify-between items-center">
      <Typography>Voice-Ping</Typography>
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
