import { renderHook, act, waitFor } from "@testing-library/react";
import { useBot } from "./useBot";
import * as botStore from "../stores/botStore";
import * as botApi from "@/api/bot";
import { useMutation } from "@/hooks/useMutation";

jest.mock("@/api/bot");
jest.mock("../stores/botStore");
jest.mock("@/hooks/useMutation");

describe("useBot", () => {
  const setBotsMock = jest.fn();
  const setSelectedBotIdMock = jest.fn();
  const useMutationMock = useMutation as jest.MockedFunction<any>;
  const mockRequest = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(botApi, "fetchBots").mockReturnValue(mockRequest);
    jest.spyOn(botStore, "useBotStore").mockReturnValue({
      bots: [],
      selectedBotId: null,
      setBots: setBotsMock,
      setSelectedBotId: setSelectedBotIdMock,
    });

    useMutationMock.mockReturnValue({
      mutate: jest.fn(),
    });
  });

  // 取得成功時にボット一覧が更新されるか
  it("should set bots when fetchBots is successful", async () => {
    const botsData = [{ id: "bot1", name: "Test Bot" }];
    mockRequest.mockResolvedValue({ bots: botsData });

    const { result } = renderHook(() => useBot({}));

    await act(async () => {
      await result.current.mutation.mutate();
    });

    waitFor(() => {
      expect(setBotsMock).toHaveBeenCalledWith(botsData);
      expect(result.current.bots).toEqual(botsData);
    });
  });

  // 意図しない値の場合に、からの配列がセットされるか
  it("should set bots to an empty array when fetchBots returns no data", async () => {
    mockRequest.mockResolvedValue({});

    const { result } = renderHook(() => useBot({}));

    await act(async () => {
      await result.current.mutation.mutate();
    });

    waitFor(() => {
      expect(setBotsMock).toHaveBeenCalledWith([]);
      expect(result.current.bots).toEqual([]);
    });
  });
});
