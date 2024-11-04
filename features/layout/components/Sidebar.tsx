"use client";

import AddBotDialog from "@/features/bot/components/AddBotDialog";
import { useBot } from "@/features/bot/hooks/useBot";
import AddDifyDialog from "@/features/dify/components/AddDifyDialog";
import { useDify } from "@/features/dify/hooks/useDify";
import { Divider, Skeleton, Typography } from "@mui/material";

export const Sidebar = () => {
  const { bots, mutation, selectedBotId, setSelectedBotId } = useBot({
    isLoad: true,
  });
  const dify = useDify({
    isLoad: true,
  });

  if (mutation.isPending || mutation.isIdle || mutation.isPaused) {
    return (
      <div className="p-2 flex flex-col gap-1">
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
        <Skeleton variant="rounded" animation="wave" width="100%" height={32} />
      </div>
    );
  }
  return (
    <>
      <div className="p-2 flex flex-col gap-1">
        {/* discord bot一覧 */}
        <div className="flex justify-center">
          <Typography fontWeight="bold">Discord</Typography>
        </div>
        {bots.map((bot) => (
          <div
            className={`cursor-pointer w-full h-8 justify-center items-center flex ${
              selectedBotId === bot.name ? "bg-blue-500 text-white" : ""
            }`}
            key={bot.id}
            onClick={() => {
              setSelectedBotId(bot.name);
            }}
          >
            <img src={bot.avatar || ""} width="30px" alt="User Avatar"></img>
          </div>
        ))}
        <AddBotDialog>
          <div className="cursor-pointer w-full h-8 justify-center items-center flex">
            追加
          </div>
        </AddBotDialog>
        <Divider />

        {/* 登録済みのdify一覧 */}
        <div className="flex justify-center">
          <Typography fontWeight="bold">Difyボット</Typography>
        </div>
        {dify.difyList.map(({ name }) => (
          <div
            className={`cursor-pointer w-full  justify-center items-center flex ${
              dify.selectedDifyId === name ? "bg-blue-500 text-white" : ""
            }`}
            key={name}
            onClick={() => {
              dify.setSelectedDifyId(name);
            }}
          >
            <Typography>{name}</Typography>
          </div>
        ))}
        <AddDifyDialog onSubmit={() => dify.mutation.mutate()}>
          <div className="cursor-pointer w-full h-8 justify-center items-center flex">
            追加
          </div>
        </AddDifyDialog>
      </div>
    </>
  );
};
