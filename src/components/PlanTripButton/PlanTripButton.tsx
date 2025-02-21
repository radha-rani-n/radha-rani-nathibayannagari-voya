import { Button } from "antd";
import PlanTrip from "../../pages/PlanTrip/PlanTrip";
import "./PlanTripButton.scss";
import { useCustomModal } from "../../hooks/useModal";
import { CustomModal } from "../Modal/CustomModal";
const PlanTripButton = () => {
  const { open, confirmLoading, showModal, handleOk, handleCancel } =
    useCustomModal();
  return (
    <>
      <Button
        variant="text"
        color="default"
        onClick={showModal}
        className="plan-trip"
      >
        Plan A Trip
      </Button>
      <CustomModal
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <PlanTrip
          handleOk={() => {
            handleOk();
          }}
          handleCancel={handleCancel}
        />
      </CustomModal>
    </>
  );
};
export default PlanTripButton;
