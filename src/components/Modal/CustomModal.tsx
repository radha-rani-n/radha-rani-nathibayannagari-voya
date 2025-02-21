import { Modal } from "antd";

const CustomModal = ({
  open,
  handleOk,
  handleCancel,
  confirmLoading,
  children,
}: {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  confirmLoading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      title="Title"
      okText="submit"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[]}
    >
      {children}
    </Modal>
  );
};

export { CustomModal };
