import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";
import { CustomNodeProps } from "@/types/node";

export const CustomDifyNode = ({ data }: CustomNodeProps) => (
  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      width: "300px",
      background: "#fff",
    }}
  >
    <Handle style={BaseHandleStyle} type="target" position={Position.Left} />
    <div className="flex">
      <PsychologyOutlinedIcon />
      <Typography variant="subtitle1">Dify</Typography>
    </div>

    <Typography variant="body1">
      Dify:<b>{data.label}</b>に送信
    </Typography>
    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
