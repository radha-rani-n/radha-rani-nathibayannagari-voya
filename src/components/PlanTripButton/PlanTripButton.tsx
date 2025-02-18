import { Button, Modal } from "antd";
import { useState } from "react";
import PlanTrip from "../../pages/PlanTrip/PlanTrip";

const PlanTripButton = ({ refreshItems }: { refreshItems: () => void }) => {
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
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Plan A Trip
      </Button>
      <Modal
        title="Title"
        okText="submit"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <PlanTrip
          handleOk={() => {
            refreshItems();
            handleOk();
          }}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
};
export default PlanTripButton;
