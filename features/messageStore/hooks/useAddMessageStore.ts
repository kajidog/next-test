import { upsertMessageStore } from "@/api/messageStore";
import { useMutation } from "@/hooks/useMutation";

export interface useAddMessageStoreOptions {
  onSuccess?: () => void; // 作成成功時に親で実行したいコールバック関数
}

export const useAddMessageStore = (options?: useAddMessageStoreOptions) => {
  // MessageStore作成API
  const mutation = useMutation({
    mutationFn: upsertMessageStore(),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      return data;
    },
  });

  // MessageStore作成処理
  const handleAddMessageStore = async (messageStoreInfo: {
    name: string;
    url: string;
  }) => {
    await mutation.mutateAsync(messageStoreInfo); // バックエンドにリクエスト
  };

  return {
    handleAddMessageStore,
    mutation,
  };
};
