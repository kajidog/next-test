import BotFlow from "@/features/discordBot/components/BotFlow";

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
