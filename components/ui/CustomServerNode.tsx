import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import { Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";
import { CustomNodeProps } from "@/types/node";

export const CustomServerNode = ({ data }: CustomNodeProps) => (
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
