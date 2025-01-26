import { fetchDifyList } from "@/api/dify";
import { useDifyStore } from "../stores/difyStore";
import { useMutation } from "@/hooks/useMutation";
import { useEffect } from "react";

export interface useDify {
  isLoad?: boolean;
}

export const useDify = (options?: useDify) => {
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
