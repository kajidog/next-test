import { Button } from "@mui/material";
import React from "react";
import { useDify } from "@/features/dify/hooks/useDify";
import { useBotFlow } from "../hooks/useBotFlow";

export interface NodeAddMenuProps {
  isAddMode: boolean;
  setIsAddMode: ReturnType<typeof useBotFlow>["setIsAddMode"];
}

export const NodeAddMenu: React.FC<NodeAddMenuProps> = ({
  setIsAddMode,
  isAddMode,
}) => {
  const { difyList } = useDify({ isLoad: true });
  return (
    <>
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
    </>
  );
};

export default NodeAddMenu;
