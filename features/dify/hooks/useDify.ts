import { useEffect } from "react";
import { fetchDifyList } from "@/api/dify";
import { useMutation } from "@/hooks/useMutation";
import { useDifyStore } from "../stores/difyStore";

export interface useDifyOptions {
  isLoad?: boolean;
}

export const useDify = (options?: useDifyOptions) => {
  const { setDifyList, difyList, selectedDifyId, setSelectedDifyId } =
    useDifyStore();

  // Dify一覧取得API
  const mutation = useMutation({
    mutationFn: fetchDifyList(),
    onSuccess: (data) => {
      if (data?.difyList) {
        setDifyList(data.difyList.map((dify) => ({ ...dify, type: "dify" })));
        return data.difyList;
      }
      setDifyList([]);
      return [];
    },
  });

  // ロード時にDify一覧を取得
  useEffect(() => {
    if (options?.isLoad) {
      mutation.mutate();
    }
  }, []);

  return {
    difyList,
    selectedDifyId,
    setSelectedDifyId,
    mutation,
    setDifyList,
  };
};
