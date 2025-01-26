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
import React, { useCallback, useEffect, useState } from "react";
import { DiscordBot } from "@/types/bot";
import { useBotFlowValues } from "./useBotFlowValues";
import { useSaveBotFlow } from "./useSaveBotFlow";

export const useBotFlow = (id: DiscordBot["name"]) => {
  const saveMutate = useSaveBotFlow(); // フローを保存する処理

  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const { mutation } = useBotFlowValues(id);

  useEffect(() => {
    if (mutation.data?.nodes) {
      setNodes(mutation.data.nodes);
    }
    if (mutation.data?.edges) {
      setEdges(mutation.data.edges);
    }
  }, [mutation.data]);

  const [addNode, setIsAddMode] = useState({
    isAddMode: false,
    type: "none",
    label: "none",
  });
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, deletable: true }, eds)),
    [setEdges],
  );

  const onEdgeDoubleClick: EdgeMouseHandler = useCallback(
    (event, edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges],
  );

  const handleNodesChange: OnNodesChange<Node> = useCallback(
    (changes) => {
      setNodes((nds) =>
        applyNodeChanges(
          changes.filter((change) => change.type !== "remove" || change.id),
          nds,
        ),
      );
    },
    [setNodes],
  );

  const handleEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onAddNode = useCallback(
    (event: React.MouseEvent) => {
      if (addNode.isAddMode === false) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        data: { label: `${addNode.label}` },
        position,
        type: addNode.type,
      };
      setNodes((nds) => [...nds, newNode]);
      setIsAddMode((mode) => ({ ...mode, isAddMode: false }));
    },
    [nodes, setNodes, screenToFlowPosition, addNode],
  );

  const onSave = useCallback(async () => {
    await saveMutate.handleSaveBotFlow(nodes, edges, id);
  }, [nodes, edges]);

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    onSave,
    onAddNode: addNode.isAddMode ? onAddNode : undefined,
    handleEdgesChange,
    handleNodesChange,
    onEdgeDoubleClick,
    onConnect,
    isAddMode: addNode.isAddMode,
    setIsAddMode,
  };
};
