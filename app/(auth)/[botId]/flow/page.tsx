import BotFlow from "@/features/discordBot/components/BotFlow";
import { useDiscordBot } from "@/features/discordBot/hooks/useDiscordBot";
import Header from "@/features/layout/components/Header";

export const metadata = {
  title: "ダッシュボード",
};

export default function Page({ params }: { params: { botId: string } }) {
  console.log(params);

  return (
    <>
      <BotFlow discordBotId={params.botId} />
    </>
  );
}
