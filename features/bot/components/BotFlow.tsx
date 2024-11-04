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

export interface BotFlow {}

const nodeTypes = {
  server: CustomServerNode,
  channel: CustomChannelNode,
  dify: CustomDifyNode,
  start: CustomStartNode,
  discordReply: CustomDiscordReplyNode,
};

export const BotFlow: React.FC<BotFlow> = () => {
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
  } = useBotFlow();
  const { difyList } = useDify();

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

      <div style={{ position: "absolute", bottom: 30, left: 100, zIndex: 4 }}>
        <span
          style={{
            padding: "1rem",
            background: "#fdfdfd",
            borderRadius: ".2rem",
            border: "1px solid #999",
            margin: "0 2rem",
            gap: ".25rem",
            display: "flex",
            position: "relative",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-.75rem",
              left: ".25rem",
              background: "#fff",
              padding: "0 .2rem",
            }}
          >
            Discord
          </div>
          <span
            style={{
              padding: ".25rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                setIsAddMode({
                  isAddMode: true,
                  type: "discordReply",
                  label: "discordReply",
                })
              }
            >
              Discordに返信を追加
            </Button>
          </span>
        </span>
        <span
          style={{
            padding: "1rem",
            background: "#fdfdfd",
            borderRadius: ".2rem",
            border: "1px solid #999",
            margin: "0 2rem",
            gap: ".25rem",
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-.75rem",
              left: ".25rem",
              background: "#fff",
              padding: "0 .2rem",
            }}
          >
            Difyボット
          </div>
          {difyList.map((dify) => (
            <span
              style={{
                padding: ".25rem",
              }}
            >
              <Button
                variant="outlined"
                key={dify.name}
                onClick={() =>
                  setIsAddMode({
                    isAddMode: true,
                    type: "dify",
                    label: dify.name,
                  })
                }
              >
                {dify.name}を追加
              </Button>
            </span>
          ))}
        </span>
        <button
          onClick={() =>
            setIsAddMode({
              isAddMode: false,
              type: "none",
              label: "none",
            })
          }
        >
          {isAddMode && "キャンセル"}
        </button>
      </div>
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
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 50,
          background: "white",
          padding: 10,
          zIndex: 4,
        }}
      >
        <Button variant="outlined" color="secondary" onClick={onSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

const WrappedMessageProcessingFlow = () => (
  <ReactFlowProvider>
    <BotFlow />
  </ReactFlowProvider>
);

export default WrappedMessageProcessingFlow;
