import WifiChannelOutlinedIcon from "@mui/icons-material/WifiChannelOutlined";
import { Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";
import { CustomNodeProps } from "@/types/node";

export const CustomChannelNode = ({ data }: CustomNodeProps) => (
  <div
    style={{
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      background: "#fff",
      width: "300px",
    }}
  >
    <Handle style={BaseHandleStyle} type="target" position={Position.Left} />
    <div className="flex">
      <WifiChannelOutlinedIcon />
      <Typography variant="subtitle1">チャンネル</Typography>
    </div>
    <Typography variant="body1">
      <b>{data.label}</b>でメッセージを受信
    </Typography>

    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
