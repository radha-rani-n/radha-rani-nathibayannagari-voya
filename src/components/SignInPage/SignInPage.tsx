import Spline from "@splinetool/react-spline";
import { SignIn } from "@clerk/clerk-react";
import "./SignInPage.scss";
const InteractiveComponent = () => {
  return (
    <div className="sign-in">
      <header>
        <h1 className="sign-in__title">Voya</h1>
      </header>
      <main className="sign-in__content">
        <Spline
          className="sign-in__3d-animation"
          scene="https://prod.spline.design/odfX05j8WfptzP7M/scene.splinecode"
          onLoad={(spline) => {
            spline.setZoom(0.5);
          }}
        ></Spline>
        <SignIn />
      </main>
    </div>
  );
};

export { InteractiveComponent };
