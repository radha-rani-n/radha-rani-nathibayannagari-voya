import Spline from "@splinetool/react-spline";
import { SignIn } from "@clerk/clerk-react";
import "./SignInPage.scss";
const InteractiveComponent = () => {
  return (
    <div className="sign-in">
      <Spline
        className="spline"
        scene="https://prod.spline.design/odfX05j8WfptzP7M/scene.splinecode"
        onLoad={(spline) => {
          spline.setZoom(0.5);
        }}
      ></Spline>
      <SignIn />
    </div>
  );
};

export { InteractiveComponent };
