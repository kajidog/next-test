import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";

export const CustomDiscordReplyNode = ({
  data,
}: NodeProps<{
  id: string;
  type: string;
  data: { label: string };
  position: any;
}>) => (
  <div
    style={{
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      width: "300px",
      background: "#fff0f0",
    }}
  >
    <Handle type="target" position={Position.Left} />
    <Typography variant="subtitle1">
      受信したDiscordのメッセージに返信
    </Typography>
  </div>
);
