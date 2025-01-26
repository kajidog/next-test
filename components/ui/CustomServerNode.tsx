import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import { BaseHandleStyle } from "@/constants/layout";
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
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      width: "300px",
      background: "#fff",
    }}
  >
    <Handle
      style={BaseHandleStyle}
      className="h-8"
      type="target"
      position={Position.Left}
    />
    <div className="flex">
      <DnsOutlinedIcon />
      <Typography variant="subtitle1">サーバー</Typography>
    </div>
    <Typography variant="body1">
      <b>{data.label}</b>でメッセージを受信
    </Typography>
    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
