import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseHandleStyle } from "@/constants/layout";

export const CustomMessageStoreNode = ({
  data,
}: NodeProps<{
  id: string;
  type: string;
  data: { label: string };
  position: any;
}>) => (
  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      background: "#fff",
      width: "300px",
    }}
  >
    <Handle style={BaseHandleStyle} type="target" position={Position.Left} />
    <div className="flex">
      <SaveAltOutlinedIcon />
      <Typography variant="subtitle1">ストア</Typography>
    </div>
    <Typography variant="body1">
      <b>{data.label}</b>にメッセージを保存
    </Typography>

    <Handle style={BaseHandleStyle} type="source" position={Position.Right} />
  </div>
);
