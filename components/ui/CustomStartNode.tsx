import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";

export const CustomStartNode = ({
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
      background: "#f1f6ff",
    }}
  >
    <Typography className="text-center" variant="subtitle1">
      <b>{data.label}</b>でメッセージ受信
    </Typography>
    <Handle type="source" position={Position.Right} />
  </div>
);
