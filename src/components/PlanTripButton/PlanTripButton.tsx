import { Button } from "antd";
import PlanTrip from "../../pages/PlanTrip/PlanTrip";
import "./PlanTripButton.scss";
import { useCustomModal } from "../../hooks/useCustomModal";
import { CustomModal } from "../Modal/CustomModal";
const PlanTripButton = () => {
  const { open, confirmLoading, showModal, handleOk, handleCancel } =
    useCustomModal();
  return (
    <>
      <button onClick={showModal} className="plan-trip">
        Plan A Trip
      </button>
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
