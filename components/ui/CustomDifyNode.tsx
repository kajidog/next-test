import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";

export const CustomDifyNode = ({
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
      background: "#f6fff0",
    }}
  >
    <Handle type="target" position={Position.Left} />
    <Typography variant="subtitle1">
      Dify: <b>{data.label}</b>
    </Typography>
    <Typography variant="body1">AI Botを利用</Typography>
    <Handle type="source" position={Position.Right} />
  </div>
);
