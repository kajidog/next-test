import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";

export const CustomChannelNode = ({
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
      background: "#fff8ef",
    }}
  >
    <Handle type="target" position={Position.Left} />
    <Typography variant="subtitle1">
      チャンネル: <b>{data.label}</b>
    </Typography>
    <Typography variant="body1">
      <b>このチャンネル</b>でメッセージを受信
    </Typography>

    <Handle type="source" position={Position.Right} />
  </div>
);
