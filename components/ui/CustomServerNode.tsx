import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";

export const CustomServerNode = ({
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
      background: "#f1f6ff",
    }}
  >
    <Handle type="target" position={Position.Left} />
    <Typography variant="subtitle1">サーバー: {data.label}</Typography>
    <Typography variant="body1">
      <b>このサーバー</b>でメッセージを受信
    </Typography>
    <Handle type="source" position={Position.Right} />
  </div>
);
