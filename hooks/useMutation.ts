import {
  useMutation as useMutationReact,
  DefaultError,
} from "@tanstack/react-query";

// 共通のuseMutationの処理
export const useMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(client: {
  mutationFn: (data: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => TContext;
  onError?: (err: TError) => void;
}) => {
  const mutation = useMutationReact<TData, TError, TVariables, TContext>({
    mutationFn: (data) => {
      return client.mutationFn(data);
    },
    onSuccess: async (data) => {
      return client.onSuccess?.(data);
    },
    onError: (error) => {
      return client.onError?.(error);
    },
    onSettled: () => {
      // 通信終了
    },
  });
  return mutation;
};
