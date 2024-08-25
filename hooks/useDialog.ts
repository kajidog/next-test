import { useState } from "react";

export interface useDialog {
  isOpen?: boolean;
}

export const useDialog = (option?: useDialog) => {
  const [isOpenState, setIsOpenState] = useState(option?.isOpen ?? false);

  const close = () => {
    setIsOpenState(false);
  };
  const open = () => {
    setIsOpenState(true);
  };

  return {
    isOpen: isOpenState,
    close,
    open,
  };
};
