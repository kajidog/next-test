"use client";

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import React from "react";
import { CustomChannelNode } from "@/components/ui/CustomChannelNode";
import { CustomDifyNode } from "@/components/ui/CustomDifyNode";
import { CustomDiscordReplyNode } from "@/components/ui/CustomDiscordReplyNode";
import { CustomMessageStoreNode } from "@/components/ui/CustomMessageStoreNode";
import { CustomServerNode } from "@/components/ui/CustomServerNode";
import { CustomStartNode } from "@/components/ui/CustomStartNode";
import { DiscordBot } from "@/types/bot";
import { useBotFlow } from "../hooks/useBotFlow";
import FooterNavigation from "./FooterNavigation";

export interface BotFlowProps {
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

export const BotFlow: React.FC<BotFlowProps> = (props) => {
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

const WrappedMessageProcessingFlow = (props: BotFlowProps) => (
  <ReactFlowProvider>
    <BotFlow {...props} />
  </ReactFlowProvider>
);

export default WrappedMessageProcessingFlow;
