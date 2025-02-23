import { useState } from "react";

const useCustomModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 0);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    confirmLoading,
    setConfirmLoading,
    modalText,
    setModalText,
    showModal,
    handleOk,
    handleCancel,
  };
};

export { useCustomModal };
