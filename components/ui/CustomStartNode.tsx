import { BaseHandleStyle } from "@/constants/layout";
import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

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
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      background: "#fff",
      width: "300px",
    }}
  >
    <div className="flex items-center">
      <PlayArrowOutlinedIcon fontSize="large" />
      <Typography variant="subtitle1">
        <b>{data.label}</b>でメッセージ受信
      </Typography>
    </div>
    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
