import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";
import { CustomNodeProps } from "@/types/node";

export const CustomStartDeleteNode = ({ data }: CustomNodeProps) => (
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
        <b>{data.label}</b>でメッセージ削除
      </Typography>
    </div>
    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
