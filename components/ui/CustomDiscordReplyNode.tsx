import { Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";
import { CustomNodeProps } from "@/types/node";

export const CustomDiscordReplyNode = ({ data }: CustomNodeProps) => (
  <div
    style={{
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      width: "300px",
      background: "#fff",
    }}
  >
    <Handle style={BaseHandleStyle} type="target" position={Position.Left} />
    <Typography variant="subtitle1">
      受信したDiscordのメッセージに返信
    </Typography>
  </div>
);
