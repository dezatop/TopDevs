//React
import React, { FC } from "react";
//Style
import st from "./index.module.scss";

interface IProps {
  status: "idle" | "loading" | "failed";
  children: React.ReactNode;
}

const CheckApiStatus: FC<IProps> = ({ status, children }) => {
  if (status === "loading") {
    return (
      <div className={st.cssloadPreloader}>
        <div className={st.cssloadPreloaderBox}>
          <div>L</div>
          <div>o</div>
          <div>a</div>
          <div>d</div>
          <div>i</div>
          <div>n</div>
          <div>g</div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <h1>Server Error</h1>;
  }

  return <>{children}</>;
};

export default CheckApiStatus;
