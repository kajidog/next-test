import { useState } from "react";

export interface useDialogOptions {
  isOpen?: boolean;
}

export const useDialog = (option?: useDialogOptions) => {
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
