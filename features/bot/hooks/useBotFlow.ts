import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeMouseHandler,
  Node,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { useSaveBotFlow } from "./useSaveBotFlow";
import { useBotFlowValues } from "./useBotFlowValues";

export const useBotFlow = () => {
  const saveMutate = useSaveBotFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { mutation } = useBotFlowValues();

  useEffect(() => {
    console.log(mutation.data);
    if (mutation.data?.nodes) {
      setNodes(mutation.data.nodes);
    }
    if (mutation.data?.edges) {
      setEdges(mutation.data.edges);
    }
  }, [mutation.data]);

  const [isAddMode, setIsAddMode] = useState<boolean | string>(false);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, deletable: true }, eds)),
    [setEdges]
  );

  const onEdgeDoubleClick: EdgeMouseHandler = useCallback(
    (event, edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const handleNodesChange: OnNodesChange<Node> = useCallback(
    (changes) => {
      setNodes((nds) =>
        applyNodeChanges(
          changes.filter((change) => change.type !== "remove" || change.id),
          nds
        )
      );
    },
    [setNodes]
  );

  const handleEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onAddNode = useCallback(
    (event: React.MouseEvent) => {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        data: { label: `${isAddMode}` },
        position,
        type: isAddMode === "discordReply" ? "discordReply" : "dify",
      };
      setNodes((nds) => [...nds, newNode]);
      setIsAddMode(false);
    },
    [nodes, setNodes, screenToFlowPosition, isAddMode]
  );

  const onSave = useCallback(async () => {
    await saveMutate.handleSaveBotFlow(nodes, edges);
  }, [nodes, edges]);

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    onSave,
    onAddNode: isAddMode ? onAddNode : undefined,
    handleEdgesChange,
    handleNodesChange,
    onEdgeDoubleClick,
    onConnect,
    isAddMode,
    setIsAddMode,
  };
};
