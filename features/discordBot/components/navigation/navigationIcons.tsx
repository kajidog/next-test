"use client";

import ForumIcon from "@mui/icons-material/Forum";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StorageIcon from "@mui/icons-material/Storage";

export function getNavigationIcon(id: string) {
  const iconStyle = { fontSize: "1.25rem", color: "#666" };

  switch (id) {
    case "channel":
      return <ForumIcon sx={iconStyle} />;
    case "dify":
      return <SmartToyIcon sx={iconStyle} />;
    case "messageSave":
      return <StorageIcon sx={iconStyle} />;
    default:
      return null;
  }
}
