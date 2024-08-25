import { addDify } from "@/api/dify";
import { useMutation } from "@/hooks/useMutation";
import { Dify } from "@/types/dify";

export interface useAddDify {
  onSuccess?: (difyList: Dify[]) => void; // 作成成功時に親で実行したいコールバック関数
}

export const useAddDify = (options: useAddDify | undefined) => {
  // Dify作成API
  const mutation = useMutation({
    mutationFn: addDify(),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data?.difyList ?? []);
      }
      return data?.difyList ?? [];
    },
  });

  // Dify作成処理
  const handleAddDify = async (difyInfo: {
    name: string;
    url: string;
    token: string;
    color: string;
  }) => {
    await mutation.mutateAsync(difyInfo); // バックエンドにリクエスト
  };

  return {
    handleAddDify,
    mutation,
  };
};
