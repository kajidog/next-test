"use client";

import React from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import { CustomDifyNode } from "@/components/ui/CustomDifyNode";
import { CustomDiscordReplyNode } from "@/components/ui/CustomDiscordReplyNode";
import { CustomChannelNode } from "@/components/ui/CustomChannelNode";
import { CustomStartNode } from "@/components/ui/CustomStartNode";
import { CustomServerNode } from "@/components/ui/CustomServerNode";
import { useBotFlow } from "../hooks/useBotFlow";
import { Button } from "@mui/material";
import { useDify } from "@/features/dify/hooks/useDify";
import { DiscordBot } from "@/types/bot";
import NodeAddMenu from "./NodeAddMenu";
import { CustomMessageStoreNode } from "@/components/ui/CustomMessageStoreNode";
import FooterNavigation from "./FooterNavigation";

export interface BotFlow {
  discordBotId: DiscordBot["id"];
}

const nodeTypes = {
  server: CustomServerNode,
  channel: CustomChannelNode,
  dify: CustomDifyNode,
  start: CustomStartNode,
  discordReply: CustomDiscordReplyNode,
  messageSave: CustomMessageStoreNode,
};

export const BotFlow: React.FC<BotFlow> = (props) => {
  const {
    nodes,
    edges,
    handleEdgesChange,
    handleNodesChange,
    onConnect,
    onAddNode,
    onEdgeDoubleClick,
    setIsAddMode,
    onSave,
    isAddMode,
  } = useBotFlow(props.discordBotId);

  const { difyList } = useDify({
    isLoad: true,
  });

  return (
    <div className="absolute inset-0 w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        deleteKeyCode={["Backspace", "Delete"]}
        nodeTypes={nodeTypes as any}
        onPaneClick={onAddNode}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>

      {isAddMode && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 100,
            background: "white",
            padding: 10,
            zIndex: 4,
          }}
        >
          ペイン上の任意の場所をクリックして新しいノードを追加してください
        </div>
      )}
      <FooterNavigation {...{ setIsAddMode, onSave }} />
    </div>
  );
};

const WrappedMessageProcessingFlow = (props: BotFlow) => (
  <ReactFlowProvider>
    <BotFlow {...props} />
  </ReactFlowProvider>
);

export default WrappedMessageProcessingFlow;
