import { NodeProps, XYPosition } from "@xyflow/react";

export interface CustomNodeProps extends NodeProps {
  id: string;
  type: string;
  data: { label: string };
  position: XYPosition;
}
