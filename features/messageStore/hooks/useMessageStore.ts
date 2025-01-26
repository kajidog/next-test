import { fetchMessageStores } from "@/api/messageStore";
import { useMutation } from "@/hooks/useMutation";
import { useMessageStore as useMessageStoreValue } from "../store/messageStore";
import { BaseOptionProps } from "@/types/index";
import { useEffect } from "react";

export const useMessageStore = (options?: BaseOptionProps) => {
  const { setMessageStores, messageStores } = useMessageStoreValue();

  const mutation = useMutation({
    mutationFn: fetchMessageStores(),
    onSuccess: (data) => {
      setMessageStores(data?.messageStores ?? []);
      return data?.messageStores ?? [];
    },
  });

  useEffect(() => {
    if (options?.isLoad) {
      mutation.mutate();
    }
  }, []);

  return {
    mutation,
    messageStores,
  };
};
