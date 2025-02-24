import { Modal } from "antd";

const CustomModal = ({
  open,
  handleOk,
  handleCancel,
  confirmLoading,
  children,
  title,
}: {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  confirmLoading: boolean;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <Modal
      title={title}
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
